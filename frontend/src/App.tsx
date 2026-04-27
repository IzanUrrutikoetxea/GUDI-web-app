import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import RegisterPage from './pages/RegisterPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login */}
                <Route path="/login" element={<LoginPage />} />

                {/* Register */}
                <Route path="/register" element={<RegisterPage />} />

                {/* Dashboard protegido */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                {/* Redirección raíz */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Wildcard SIEMPRE AL FINAL */}
                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App