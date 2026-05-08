import { useEffect, useState, FormEvent } from "react";
import { messageService } from "../services/messageService";
import { Message, MessageChannel, MessageStatus } from "../types";
import "../pages/AgendaPage.css";
import "./MessagesPage.css";

const CHANNEL_LABEL: Record<MessageChannel, string> = {
  EMAIL: "Email",
  WHATSAPP: "WhatsApp",
  INTERNAL: "Interno",
};

const CHANNEL_ICON: Record<MessageChannel, string> = {
  EMAIL: "✉️",
  WHATSAPP: "💬",
  INTERNAL: "🏢",
};

const STATUS_LABEL: Record<MessageStatus, string> = {
  UNREAD: "No leído",
  READ: "Leído",
  ARCHIVED: "Archivado",
};

const CHANNELS: MessageChannel[] = ["EMAIL", "WHATSAPP", "INTERNAL"];

const EMPTY_FORM = {
  senderName: "",
  senderContact: "",
  channel: "EMAIL" as MessageChannel,
  subject: "",
  body: "",
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterChannel, setFilterChannel] = useState<MessageChannel | "">("");
  const [filterStatus, setFilterStatus] = useState<MessageStatus | "">("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [stats, setStats] = useState<{ total: number; unread: number } | null>(null);

  function load() {
    setLoading(true);
    messageService
      .getAll({
        channel: filterChannel || undefined,
        status: filterStatus || undefined,
      })
      .then(setMessages)
      .catch(() => setError("No se pudieron cargar los mensajes"))
      .finally(() => setLoading(false));
    messageService.stats().then((s) => setStats({ total: s.total, unread: s.unread }));
  }

  useEffect(() => { load(); }, [filterChannel, filterStatus]);

  async function handleOpen(msg: Message) {
    setSelected(msg);
    if (msg.status === "UNREAD") {
      await messageService.updateStatus(msg.id, "READ");
      load();
    }
  }

  async function handleArchive(id: number) {
    await messageService.updateStatus(id, "ARCHIVED");
    if (selected?.id === id) setSelected(null);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("¿Eliminar este mensaje?")) return;
    await messageService.remove(id);
    if (selected?.id === id) setSelected(null);
    load();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    try {
      await messageService.create(form);
      setShowForm(false);
      setForm(EMPTY_FORM);
      load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Error al enviar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="messages">
      <div className="page-header">
        <div className="page-header__row">
          <div>
            <h1 className="page-header__title">Mensajería</h1>
            <p className="page-header__subtitle">
              Bandeja omnicanal
              {stats && (
                <span className="messages__badge">
                  {stats.unread} no leídos / {stats.total} total
                </span>
              )}
            </p>
          </div>
          <button className="btn btn--primary" onClick={() => setShowForm(true)}>
            + Nuevo mensaje
          </button>
        </div>
      </div>

      <div className="messages__layout">
        {/* Sidebar: filters + list */}
        <div className="messages__sidebar">
          <div className="messages__filters">
            <select
              className="form-input"
              value={filterChannel}
              onChange={(e) => { setFilterChannel(e.target.value as MessageChannel | ""); setSelected(null); }}
            >
              <option value="">Todos los canales</option>
              {CHANNELS.map((c) => (
                <option key={c} value={c}>{CHANNEL_ICON[c]} {CHANNEL_LABEL[c]}</option>
              ))}
            </select>
            <select
              className="form-input"
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value as MessageStatus | ""); setSelected(null); }}
            >
              <option value="">Todos los estados</option>
              {(["UNREAD", "READ", "ARCHIVED"] as MessageStatus[]).map((s) => (
                <option key={s} value={s}>{STATUS_LABEL[s]}</option>
              ))}
            </select>
          </div>

          {loading && <p className="agenda__loading">Cargando...</p>}
          {error && <p className="agenda__error">{error}</p>}

          {!loading && messages.length === 0 && (
            <p className="messages__empty">No hay mensajes</p>
          )}

          <div className="messages__list">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`msg-item ${msg.status === "UNREAD" ? "msg-item--unread" : ""} ${selected?.id === msg.id ? "msg-item--selected" : ""}`}
                onClick={() => handleOpen(msg)}
              >
                <div className="msg-item__header">
                  <span className="msg-item__channel">
                    {CHANNEL_ICON[msg.channel]}
                  </span>
                  <span className="msg-item__sender">{msg.senderName}</span>
                  <span className="msg-item__date">
                    {new Date(msg.createdAt).toLocaleDateString("es-ES")}
                  </span>
                </div>
                {msg.subject && (
                  <div className="msg-item__subject">{msg.subject}</div>
                )}
                <div className="msg-item__preview">{msg.body.slice(0, 80)}...</div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="messages__detail">
          {!selected ? (
            <div className="messages__detail-empty">
              Selecciona un mensaje para leerlo
            </div>
          ) : (
            <div className="message-view">
              <div className="message-view__header">
                <div>
                  <div className="message-view__subject">
                    {selected.subject || "(Sin asunto)"}
                  </div>
                  <div className="message-view__meta">
                    <span>{CHANNEL_ICON[selected.channel]} {CHANNEL_LABEL[selected.channel]}</span>
                    <span>·</span>
                    <span>{selected.senderName}</span>
                    <span>·</span>
                    <span>{selected.senderContact}</span>
                    <span>·</span>
                    <span>{new Date(selected.createdAt).toLocaleString("es-ES")}</span>
                  </div>
                </div>
                <div className="message-view__actions">
                  {selected.status !== "ARCHIVED" && (
                    <button className="btn btn--sm btn--ghost" onClick={() => handleArchive(selected.id)}>
                      Archivar
                    </button>
                  )}
                  <button className="btn btn--sm btn--danger" onClick={() => handleDelete(selected.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="message-view__body">{selected.body}</div>
              <div className="message-view__footer">
                <span className={`status-badge status-badge--${selected.status.toLowerCase()}`}>
                  {STATUS_LABEL[selected.status]}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New message modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal modal--wide" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal__title">Nuevo mensaje</h2>
            <form className="modal__form" onSubmit={handleSubmit}>
              {formError && <div className="form-error">{formError}</div>}

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Nombre del remitente</label>
                  <input className="form-input" type="text" value={form.senderName}
                    onChange={(e) => setForm({ ...form, senderName: e.target.value })} required />
                </div>
                <div className="form-field">
                  <label className="form-label">Contacto (email / teléfono)</label>
                  <input className="form-input" type="text" value={form.senderContact}
                    onChange={(e) => setForm({ ...form, senderContact: e.target.value })} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Canal</label>
                  <select className="form-input" value={form.channel}
                    onChange={(e) => setForm({ ...form, channel: e.target.value as MessageChannel })}>
                    {CHANNELS.map((c) => (
                      <option key={c} value={c}>{CHANNEL_ICON[c]} {CHANNEL_LABEL[c]}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Asunto (opcional)</label>
                  <input className="form-input" type="text" value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Mensaje</label>
                <textarea className="form-input form-textarea" value={form.body} rows={5}
                  onChange={(e) => setForm({ ...form, body: e.target.value })} required />
              </div>

              <div className="modal__footer">
                <button type="button" className="btn btn--ghost" onClick={() => setShowForm(false)}>Cancelar</button>
                <button type="submit" className="btn btn--primary" disabled={saving}>
                  {saving ? "Enviando..." : "Enviar mensaje"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
