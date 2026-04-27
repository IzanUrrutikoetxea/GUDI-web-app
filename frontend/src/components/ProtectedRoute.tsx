import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
    children: ReactNode
}

// Verifica si el token JWT es válido y no ha expirado
const isValidJwt = (token: string) => {
    try {
        const parts = token.split('.')

        if (parts.length !== 3) {
            return false
        }

        const payload = JSON.parse(atob(parts[1]))

        if (!payload.exp) {
            return false
        }

        // comprobar expiración
        return payload.exp * 1000 > Date.now()

    } catch {
        return false
    }
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = localStorage.getItem('token')

    // Si no hay token o es inválido
    if (!token || !isValidJwt(token)) {
        localStorage.removeItem('token')
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute