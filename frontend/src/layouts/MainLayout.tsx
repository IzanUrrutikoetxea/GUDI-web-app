import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./MainLayout.css";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: "⊞" },
  { to: "/agenda", label: "Agenda", icon: "📅" },
  { to: "/presupuestos", label: "Presupuestos", icon: "📄" },
  { to: "/mensajeria", label: "Mensajería", icon: "💬" },
];

export default function MainLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar__logo">GUDI</div>
        <nav className="sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                "sidebar__link" + (isActive ? " sidebar__link--active" : "")
              }
            >
              <span className="sidebar__icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__avatar">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="sidebar__username">{user?.name}</div>
              <div className="sidebar__role">{user?.role}</div>
            </div>
          </div>
          <button className="sidebar__logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="layout__main">{children}</main>
    </div>
  );
}
