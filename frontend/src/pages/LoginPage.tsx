import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";
import "../components/AuthForm.css";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token, user } = await authService.login(email, password);
      login(token, user);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <div className="auth__logo">GUDI</div>
        <h1 className="auth__title">Iniciar sesión</h1>

        <form className="auth__form" onSubmit={handleSubmit}>
          {error && <div className="auth__error">{error}</div>}

          <div className="auth__field">
            <label className="auth__label" htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              className="auth__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="tu@email.com"
            />
          </div>

          <div className="auth__field">
            <label className="auth__label" htmlFor="password">Contraseña</label>
            <input
              id="password"
              className="auth__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          <button className="auth__submit" type="submit" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="auth__footer">
          ¿No tienes cuenta?{" "}
          <Link to="/register">Crear cuenta</Link>
        </p>
      </div>
    </div>
  );
}
