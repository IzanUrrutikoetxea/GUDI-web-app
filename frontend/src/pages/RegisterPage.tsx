import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/LoginPage.css'
import { apiPost } from '../services/api'

function RegisterPage() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError('')
        setLoading(true)

        try {
            if (!name || !email || !password || !confirmPassword) {
                setError('Completa todos los campos')
                return
            }

            if (password !== confirmPassword) {
                setError('Las contraseñas no coinciden')
                return
            }

            const data = await apiPost<{ token: string }>('/auth/register', {
                name,
                email,
                password,
            })

            localStorage.setItem('token', data.token)

            navigate('/dashboard')

        } catch {
            setError('No se pudo crear la cuenta')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <form className="login-form register-form" onSubmit={handleSubmit}>
                <div className="login-header">
                    <span className="login-badge">GUDI</span>
                    <h2>Crear cuenta</h2>
                    <p>Regístrate para acceder al panel principal del sistema</p>
                </div>

                <div className="input-group">
                    <label htmlFor="name">Nombre completo</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Introduce tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="name"
                    />
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
                        placeholder="Crea una contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Repite la contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>

                {error && <p className="login-error">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Creando cuenta...' : 'Registrarse'}
                </button>

                <p className="login-switch">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage