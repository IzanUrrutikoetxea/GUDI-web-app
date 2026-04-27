import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatCard from '../components/StatCard'
import { apiGet } from '../services/api'
import './DashboardPage.css'

type DashboardStats = {
    summary: {
        totalUsers: number
        totalAdmins: number
        regularUsers: number
        usersCreatedLast7Days: number
    }
    activity: Array<{
        id: number
        name: string
        email: string
        role: string
        createdAt: string
    }>
    system: {
        generatedAt: string
        status: string
    }
}

type CurrentUser = {
    id: number
    name: string
    email: string
    role: string
    createdAt: string
}

function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true)
                setError('')

                const [statsResponse, meResponse] = await Promise.all([
                    apiGet<DashboardStats>('/api/dashboard/stats'),
                    apiGet<CurrentUser>('/api/auth/me'),
                ])

                setStats(statsResponse)
                setCurrentUser(meResponse)
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : 'No se pudo cargar el dashboard'

                setError(message)

                if (message.toLowerCase().includes('token')) {
                    localStorage.removeItem('token')
                    navigate('/login', { replace: true })
                }
            } finally {
                setLoading(false)
            }
        }

        void loadDashboard()
    }, [navigate])

    const statCards = useMemo(() => {
        if (!stats) return []

        return [
            {
                title: 'Usuarios totales',
                value: stats.summary.totalUsers,
                description: 'Usuarios registrados actualmente en el sistema.',
                icon: '👥',
            },
            {
                title: 'Administradores',
                value: stats.summary.totalAdmins,
                description: 'Cuentas con permisos de administración.',
                icon: '🛡️',
            },
            {
                title: 'Usuarios estándar',
                value: stats.summary.regularUsers,
                description: 'Usuarios sin privilegios avanzados.',
                icon: '🙋',
            },
            {
                title: 'Altas últimos 7 días',
                value: stats.summary.usersCreatedLast7Days,
                description: 'Nuevos registros recientes en la plataforma.',
                icon: '📈',
            },
        ]
    }, [stats])

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
    }

    if (loading) {
        return (
            <main className="dashboard-state">
                <div className="dashboard-state__card">
                    <p>Cargando dashboard...</p>
                </div>
            </main>
        )
    }

    if (error) {
        return (
            <main className="dashboard-state">
                <div className="dashboard-state__card">
                    <h2>No se pudo cargar el panel</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Reintentar</button>
                </div>
            </main>
        )
    }

    return (
        <main className="dashboard-page">
            <section className="dashboard-hero">
                <div>
                    <span className="dashboard-hero__eyebrow">Panel de control GUDI</span>
                    <h1>Resumen general del sistema</h1>
                    <p>
                        Consulta estadísticas básicas, actividad reciente y estado general
                        de la aplicación desde una única pantalla.
                    </p>
                </div>

                <div className="dashboard-hero__actions">
                    <div className="dashboard-user-card">
                        <span className="dashboard-user-card__label">Sesión activa</span>
                        <strong>{currentUser?.name}</strong>
                        <span>
                            {currentUser?.role} · {currentUser?.email}
                        </span>
                    </div>
                    <button className="secondary-button" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            </section>

            <section className="stats-grid">
                {statCards.map((card) => (
                    <StatCard key={card.title} {...card} />
                ))}
            </section>

            <section className="dashboard-content">
                <article className="dashboard-panel">
                    <div className="dashboard-panel__header">
                        <h2>Actividad reciente</h2>
                        <p>Últimos usuarios registrados en la plataforma.</p>
                    </div>

                    <div className="activity-list">
                        {stats?.activity.map((item) => (
                            <div className="activity-item" key={item.id}>
                                <div>
                                    <strong>{item.name}</strong>
                                    <p>{item.email}</p>
                                </div>
                                <div className="activity-item__meta">
                                    <span>{item.role}</span>
                                    <span>
                                        {new Date(item.createdAt).toLocaleDateString('es-ES', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>

                <article className="dashboard-panel dashboard-panel--compact">
                    <div className="dashboard-panel__header">
                        <h2>Estado del sistema</h2>
                        <p>Información básica del backend para esta vista.</p>
                    </div>

                    <div className="system-status">
                        <div className="system-status__item">
                            <span className="system-status__label">Estado</span>
                            <strong>{stats?.system.status}</strong>
                        </div>
                        <div className="system-status__item">
                            <span className="system-status__label">Última actualización</span>
                            <strong>
                                {stats?.system.generatedAt
                                    ? new Date(stats.system.generatedAt).toLocaleString('es-ES')
                                    : '-'}
                            </strong>
                        </div>
                        <div className="system-status__item">
                            <span className="system-status__label">Módulo activo</span>
                            <strong>Dashboard fase 3</strong>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default DashboardPage
