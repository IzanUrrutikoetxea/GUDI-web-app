import { useEffect, useState } from "react";
import { api } from "../services/api";
import { User } from "../types";
import "./DashboardPage.css";

interface DashboardData {
  users: {
    total: number;
    admins: number;
    regular: number;
    newThisMonth: number;
  };
  recentActivity: User[];
}

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  color: string;
}

function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="stat-card" style={{ "--card-color": color } as React.CSSProperties}>
      <div className="stat-card__icon">{icon}</div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<DashboardData>("/dashboard/stats")
      .then(setData)
      .catch(() => setError("No se pudieron cargar las estadísticas"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="dashboard__loading">Cargando...</div>;
  if (error) return <div className="dashboard__error">{error}</div>;
  if (!data) return null;

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-header__title">Panel de control</h1>
        <p className="page-header__subtitle">Resumen general del sistema</p>
      </div>

      <div className="dashboard__stats">
        <StatCard
          label="Usuarios totales"
          value={data.users.total}
          icon="👥"
          color="#2563eb"
        />
        <StatCard
          label="Administradores"
          value={data.users.admins}
          icon="🛡️"
          color="#7c3aed"
        />
        <StatCard
          label="Usuarios regulares"
          value={data.users.regular}
          icon="👤"
          color="#0891b2"
        />
        <StatCard
          label="Nuevos este mes"
          value={data.users.newThisMonth}
          icon="✨"
          color="#16a34a"
        />
      </div>

      <div className="dashboard__section">
        <h2 className="dashboard__section-title">Actividad reciente</h2>
        {data.recentActivity.length === 0 ? (
          <p className="dashboard__empty">No hay actividad reciente</p>
        ) : (
          <div className="activity-list">
            {data.recentActivity.map((user) => (
              <div key={user.id} className="activity-item">
                <div className="activity-item__avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="activity-item__name">{user.name}</div>
                  <div className="activity-item__meta">{user.email}</div>
                </div>
                <span className={`activity-item__badge activity-item__badge--${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
                <div className="activity-item__date">
                  {new Date(user.createdAt).toLocaleDateString("es-ES")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
