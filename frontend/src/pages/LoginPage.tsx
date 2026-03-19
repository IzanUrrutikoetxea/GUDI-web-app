import { useState } from 'react'
import '../styles/login.css'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Login:', { email, password })
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-header">
                    <div className="login-badge">GUDI</div>
                    <h2>Iniciar sesion</h2>
                    <p>Accede a tu cuenta para continuar</p>
                </div>

                <div className="input-group">
                    <label htmlFor="email">Correo electronico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Introduce tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Contrasena</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Introduce tu contrasena"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default LoginPage