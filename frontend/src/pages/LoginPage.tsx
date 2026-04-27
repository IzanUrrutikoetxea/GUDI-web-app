import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginPage.css'
import { apiPost } from '../services/api'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const data = await apiPost<{ token: string }>('/auth/login', {
                email,
                password,
            })

            localStorage.setItem('token', data.token)
            navigate('/dashboard')
        } catch {
            setError('Email o contraseña incorrectos')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-header">
                    <span className="login-badge">GUDI</span>
                    <h2>Iniciar sesión</h2>
                    <p>Accede al panel principal para revisar la actividad del sistema</p>
                </div>

                <div className="input-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Introduce tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Introduce tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                {error && <p className="login-error">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>

                <p className="login-switch">
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </form>
        </div>
    )
}

export default LoginPage