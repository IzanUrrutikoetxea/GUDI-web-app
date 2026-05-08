import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const [apiStatus, setApiStatus] = useState<"checking" | "ok" | "error">("checking");

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "ok") setApiStatus("ok");
        else setApiStatus("error");
      })
      .catch(() => setApiStatus("error"));
  }, []);

  return (
    <div className="home">
      <div className="home__card">
        <h1 className="home__title">GUDI</h1>
        <p className="home__subtitle">
          Gestión Unificada Digital Inteligente
        </p>

        <div className={`home__status home__status--${apiStatus}`}>
          {apiStatus === "checking" && "Comprobando conexión con el servidor..."}
          {apiStatus === "ok" && "Servidor activo"}
          {apiStatus === "error" && "No se puede conectar con el servidor"}
        </div>

        <div className="home__actions">
          <Link to="/login" className="home__btn home__btn--primary">
            Iniciar sesión
          </Link>
          <Link to="/register" className="home__btn home__btn--secondary">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
