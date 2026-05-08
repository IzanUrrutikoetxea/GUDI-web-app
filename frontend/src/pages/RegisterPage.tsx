import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";
import "../components/AuthForm.css";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await authService.register(name, email, password);
      login(token, user);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <div className="auth__logo">GUDI</div>
        <h1 className="auth__title">Crear cuenta</h1>

        <form className="auth__form" onSubmit={handleSubmit}>
          {error && <div className="auth__error">{error}</div>}

          <div className="auth__field">
            <label className="auth__label" htmlFor="name">Nombre</label>
            <input
              id="name"
              className="auth__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              placeholder="Tu nombre"
            />
          </div>

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
              autoComplete="new-password"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <button className="auth__submit" type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="auth__footer">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}
