import { useEffect, useState, FormEvent } from "react";
import { budgetService, BudgetDocument } from "../services/budgetService";
import { Budget, BudgetStatus } from "../types";
import "../pages/AgendaPage.css";
import "./BudgetsPage.css";

const STATUS_LABEL: Record<BudgetStatus, string> = {
  DRAFT: "Borrador",
  SENT: "Enviado",
  ACCEPTED: "Aceptado",
  REJECTED: "Rechazado",
};

const EMPTY_ITEM = { description: "", quantity: 1, unitPrice: 0 };
const EMPTY_FORM = { title: "", clientName: "", taxRate: 21, items: [{ ...EMPTY_ITEM }] };

type FormItem = { description: string; quantity: number; unitPrice: number };

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Budget | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [docData, setDocData] = useState<BudgetDocument | null>(null);

  function load() {
    setLoading(true);
    budgetService.getAll()
      .then(setBudgets)
      .catch(() => setError("No se pudieron cargar los presupuestos"))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  }

  function openEdit(b: Budget) {
    setEditing(b);
    setForm({
      title: b.title,
      clientName: b.clientName,
      taxRate: b.taxRate,
      items: b.items.map((i) => ({
        description: i.description,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
    });
    setFormError("");
    setShowForm(true);
  }

  function closeForm() { setShowForm(false); setEditing(null); }

  function updateItem(index: number, field: keyof FormItem, value: string | number) {
    const items = [...form.items];
    items[index] = { ...items[index], [field]: value };
    setForm({ ...form, items });
  }

  function addItem() {
    setForm({ ...form, items: [...form.items, { ...EMPTY_ITEM }] });
  }

  function removeItem(index: number) {
    if (form.items.length === 1) return;
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
  }

  const subtotal = form.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const taxAmount = subtotal * (form.taxRate / 100);
  const total = subtotal + taxAmount;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    if (form.items.some((i) => !i.description)) {
      setFormError("Todos los conceptos deben tener descripción");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await budgetService.update(editing.id, form);
      } else {
        await budgetService.create(form);
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
    if (!confirm("¿Eliminar este presupuesto?")) return;
    try {
      await budgetService.remove(id);
      load();
    } catch {
      alert("No se pudo eliminar");
    }
  }

  async function handleDocument(id: number) {
    const doc = await budgetService.document(id);
    setDocData(doc);
  }

  return (
    <div className="budgets">
      <div className="page-header">
        <div className="page-header__row">
          <div>
            <h1 className="page-header__title">Presupuestos</h1>
            <p className="page-header__subtitle">Crea y gestiona presupuestos para tus clientes</p>
          </div>
          <button className="btn btn--primary" onClick={openNew}>+ Nuevo presupuesto</button>
        </div>
      </div>

      {loading && <p className="agenda__loading">Cargando...</p>}
      {error && <p className="agenda__error">{error}</p>}

      {!loading && !error && budgets.length === 0 && (
        <div className="agenda__empty">
          <p>No hay presupuestos registrados</p>
          <button className="btn btn--primary" onClick={openNew}>Crear primer presupuesto</button>
        </div>
      )}

      {budgets.length > 0 && (
        <div className="budgets__table-wrap">
          <table className="budgets__table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Items</th>
                <th>Creado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((b) => (
                <tr key={b.id}>
                  <td className="budgets__title">{b.title}</td>
                  <td>{b.clientName}</td>
                  <td>
                    <span className={`status-badge status-badge--${b.status.toLowerCase()}`}>
                      {STATUS_LABEL[b.status]}
                    </span>
                  </td>
                  <td>{b.items.length}</td>
                  <td>{new Date(b.createdAt).toLocaleDateString("es-ES")}</td>
                  <td className="budgets__actions">
                    <button className="btn btn--sm btn--ghost" onClick={() => handleDocument(b.id)}>Ver</button>
                    <button className="btn btn--sm btn--ghost" onClick={() => openEdit(b)}>Editar</button>
                    <button className="btn btn--sm btn--danger" onClick={() => handleDelete(b.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="modal-overlay" onClick={closeForm}>
          <div className="modal modal--wide" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal__title">{editing ? "Editar presupuesto" : "Nuevo presupuesto"}</h2>
            <form className="modal__form" onSubmit={handleSubmit}>
              {formError && <div className="form-error">{formError}</div>}

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Título</label>
                  <input className="form-input" type="text" value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="form-field">
                  <label className="form-label">Cliente</label>
                  <input className="form-input" type="text" value={form.clientName}
                    onChange={(e) => setForm({ ...form, clientName: e.target.value })} required />
                </div>
              </div>

              <div className="form-field" style={{ maxWidth: 140 }}>
                <label className="form-label">IVA (%)</label>
                <input className="form-input" type="number" min={0} max={100} step={0.1}
                  value={form.taxRate}
                  onChange={(e) => setForm({ ...form, taxRate: parseFloat(e.target.value) || 0 })} />
              </div>

              <div className="budgets__items">
                <div className="budgets__items-header">
                  <span>Conceptos</span>
                  <button type="button" className="btn btn--sm btn--ghost" onClick={addItem}>+ Añadir línea</button>
                </div>
                <div className="budgets__items-grid budgets__items-grid--head">
                  <span>Descripción</span><span>Cantidad</span><span>Precio unit.</span><span>Total</span><span></span>
                </div>
                {form.items.map((item, idx) => (
                  <div key={idx} className="budgets__items-grid">
                    <input className="form-input" type="text" placeholder="Descripción" value={item.description}
                      onChange={(e) => updateItem(idx, "description", e.target.value)} />
                    <input className="form-input" type="number" min={0.01} step={0.01} value={item.quantity}
                      onChange={(e) => updateItem(idx, "quantity", parseFloat(e.target.value) || 0)} />
                    <input className="form-input" type="number" min={0} step={0.01} value={item.unitPrice}
                      onChange={(e) => updateItem(idx, "unitPrice", parseFloat(e.target.value) || 0)} />
                    <span className="budgets__line-total">
                      {(item.quantity * item.unitPrice).toFixed(2)} €
                    </span>
                    <button type="button" className="btn btn--sm btn--danger" onClick={() => removeItem(idx)}
                      disabled={form.items.length === 1}>✕</button>
                  </div>
                ))}
                <div className="budgets__totals">
                  <span>Base imponible: <b>{subtotal.toFixed(2)} €</b></span>
                  <span>IVA ({form.taxRate}%): <b>{taxAmount.toFixed(2)} €</b></span>
                  <span className="budgets__total">Total: <b>{total.toFixed(2)} €</b></span>
                </div>
              </div>

              <div className="modal__footer">
                <button type="button" className="btn btn--ghost" onClick={closeForm}>Cancelar</button>
                <button type="submit" className="btn btn--primary" disabled={saving}>
                  {saving ? "Guardando..." : editing ? "Guardar cambios" : "Crear presupuesto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document preview modal */}
      {docData && (
        <div className="modal-overlay" onClick={() => setDocData(null)}>
          <div className="modal modal--wide" onClick={(e) => e.stopPropagation()}>
            <div className="doc">
              <div className="doc__header">
                <div>
                  <div className="doc__logo">GUDI</div>
                  <div className="doc__company">Gestión Unificada Digital Inteligente</div>
                </div>
                <div className="doc__meta">
                  <div className="doc__ref">Presupuesto #{docData.id}</div>
                  <div>{new Date(docData.createdAt).toLocaleDateString("es-ES")}</div>
                  <span className={`status-badge status-badge--${docData.status.toLowerCase()}`}>
                    {STATUS_LABEL[docData.status]}
                  </span>
                </div>
              </div>
              <div className="doc__client"><b>Cliente:</b> {docData.clientName}</div>
              <div className="doc__title">{docData.title}</div>
              <table className="doc__table">
                <thead>
                  <tr><th>Concepto</th><th>Cant.</th><th>Precio</th><th>Total</th></tr>
                </thead>
                <tbody>
                  {docData.items.map((item, i) => (
                    <tr key={i}>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unitPrice.toFixed(2)} €</td>
                      <td>{item.lineTotal.toFixed(2)} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="doc__totals">
                <div className="doc__total-row"><span>Base imponible</span><span>{docData.subtotal.toFixed(2)} €</span></div>
                <div className="doc__total-row"><span>IVA ({docData.taxRate}%)</span><span>{docData.taxAmount.toFixed(2)} €</span></div>
                <div className="doc__total-row doc__total-row--final"><span>Total</span><span>{docData.total.toFixed(2)} €</span></div>
              </div>
            </div>
            <div className="modal__footer">
              <button className="btn btn--ghost" onClick={() => window.print()}>Imprimir</button>
              <button className="btn btn--primary" onClick={() => setDocData(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
