import { useEffect, useState, FormEvent } from "react";
import { appointmentService } from "../services/appointmentService";
import { Appointment } from "../types";
import "./AgendaPage.css";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toInputValue(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toISOString().slice(0, 16);
}

const EMPTY_FORM = { title: "", description: "", startDate: "", endDate: "" };

export default function AgendaPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  function load() {
    setLoading(true);
    appointmentService
      .getAll()
      .then(setAppointments)
      .catch(() => setError("No se pudieron cargar las citas"))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  }

  function openEdit(a: Appointment) {
    setEditing(a);
    setForm({
      title: a.title,
      description: a.description ?? "",
      startDate: toInputValue(a.startDate),
      endDate: toInputValue(a.endDate),
    });
    setFormError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    if (new Date(form.endDate) <= new Date(form.startDate)) {
      setFormError("La fecha de fin debe ser posterior a la de inicio");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await appointmentService.update(editing.id, form);
      } else {
        await appointmentService.create(form);
      }
      closeForm();
      load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("¿Eliminar esta cita?")) return;
    try {
      await appointmentService.remove(id);
      load();
    } catch {
      alert("No se pudo eliminar la cita");
    }
  }

  return (
    <div className="agenda">
      <div className="page-header">
        <div className="page-header__row">
          <div>
            <h1 className="page-header__title">Agenda</h1>
            <p className="page-header__subtitle">Gestión de citas y eventos</p>
          </div>
          <button className="btn btn--primary" onClick={openNew}>
            + Nueva cita
          </button>
        </div>
      </div>

      {loading && <p className="agenda__loading">Cargando...</p>}
      {error && <p className="agenda__error">{error}</p>}

      {!loading && !error && appointments.length === 0 && (
        <div className="agenda__empty">
          <p>No hay citas registradas</p>
          <button className="btn btn--primary" onClick={openNew}>
            Crear primera cita
          </button>
        </div>
      )}

      {appointments.length > 0 && (
        <div className="agenda__list">
          {appointments.map((a) => (
            <div key={a.id} className="appointment-card">
              <div className="appointment-card__header">
                <span className="appointment-card__title">{a.title}</span>
                <div className="appointment-card__actions">
                  <button className="btn btn--sm btn--ghost" onClick={() => openEdit(a)}>
                    Editar
                  </button>
                  <button className="btn btn--sm btn--danger" onClick={() => handleDelete(a.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
              {a.description && (
                <p className="appointment-card__desc">{a.description}</p>
              )}
              <div className="appointment-card__dates">
                <span>🕐 {formatDateTime(a.startDate)}</span>
                <span>→</span>
                <span>{formatDateTime(a.endDate)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal__title">
              {editing ? "Editar cita" : "Nueva cita"}
            </h2>

            <form className="modal__form" onSubmit={handleSubmit}>
              {formError && <div className="form-error">{formError}</div>}

              <div className="form-field">
                <label className="form-label">Título</label>
                <input
                  className="form-input"
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="Título de la cita"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Descripción (opcional)</label>
                <textarea
                  className="form-input form-textarea"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Descripción..."
                  rows={3}
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Fecha inicio</label>
                  <input
                    className="form-input"
                    type="datetime-local"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Fecha fin</label>
                  <input
                    className="form-input"
                    type="datetime-local"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="modal__footer">
                <button type="button" className="btn btn--ghost" onClick={closeForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn--primary" disabled={saving}>
                  {saving ? "Guardando..." : editing ? "Guardar cambios" : "Crear cita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
