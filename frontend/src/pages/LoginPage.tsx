import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'

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
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data?.message || 'Credenciales incorrectas')
            }

            if (data.token) {
                localStorage.setItem('token', data.token)
            }

            navigate('/dashboard')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-header">
                    <h2>Iniciar sesión</h2>
                    <p>Accede a tu cuenta para continuar</p>
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
            </form>
        </div>
    )
}

export default LoginPage