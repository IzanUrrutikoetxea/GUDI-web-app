type StatCardProps = {
    title: string
    value: number | string
    description: string
    icon: string
}

function StatCard({ title, value, description, icon }: StatCardProps) {
    return (
        <article className="stat-card">
            <div className="stat-card__top">
                <span className="stat-card__icon" aria-hidden="true">
                    {icon}
                </span>
                <span className="stat-card__title">{title}</span>
            </div>

            <strong className="stat-card__value">{value}</strong>
            <p className="stat-card__description">{description}</p>
        </article>
    )
}

export default StatCard
