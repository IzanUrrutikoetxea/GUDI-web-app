# GUDI Web App

GUDI (Gestión Unificada Digital Inteligente) es una aplicación web para la digitalización y automatización inteligente de PYMEs.

## Tech stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Backend | Node.js + Express + TypeScript |
| Base de datos | PostgreSQL 16 |
| ORM | Prisma |
| Microservicio | Node.js + gRPC (notifications-service) |

## Observabilidad

| Herramienta | Función |
|-------------|---------|
| Prometheus | Recoge métricas del backend (peticiones, latencia, CPU, memoria) |
| Grafana | Visualiza métricas de Prometheus y trazas de Jaeger |
| OpenTelemetry | Auto-instrumentación del backend — genera trazas distribuidas |
| OTel Collector | Recibe y enruta trazas hacia Jaeger |
| Jaeger | Visualiza trazas distribuidas |
| Elasticsearch | Almacena logs estructurados (stack ELK) |
| Logstash | Ingesta y procesa logs |
| Kibana | Explora y visualiza logs |

## Estructura del repositorio

```
gudi-webapp/
├── frontend/                # React + TypeScript (Vite)
├── backend/                 # Node.js + Express + TypeScript
│   └── src/
│       ├── config/          # Prisma, env, metrics, logger, gRPC client
│       ├── middlewares/     # auth, metrics, requestLogger, errorHandler
│       ├── routes/          # Todos los endpoints REST
│       ├── controllers/
│       ├── services/
│       ├── tracing.ts       # OpenTelemetry bootstrap
│       └── server.ts
├── notifications-service/   # Microservicio gRPC
│   ├── proto/               # Definición del contrato gRPC
│   └── src/
├── infra/
│   ├── prometheus/          # prometheus.yml
│   ├── grafana/             # Datasources auto-provisionados
│   ├── otel-collector/      # otel-collector-config.yml
│   └── logstash/            # logstash.conf
├── docs/                    # Documentación técnica
├── docker-compose.yml
└── README.md
```

## Cómo ejecutar el proyecto

### Requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Stack base (app + observabilidad sin ELK)

```bash
git clone https://github.com/IzanUrrutikoetxea/GUDI-web-app.git
cd GUDI-web-app
docker compose up --build
```

### Stack completo (incluye ELK)

> Requiere al menos **6 GB de RAM** disponible para Docker.

```bash
docker compose --profile elk up --build
```

### URLs disponibles

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend | http://localhost:5173 | Aplicación web |
| Backend API | http://localhost:3000/api | API REST |
| Health check | http://localhost:3000/api/health | Estado del servidor |
| Métricas | http://localhost:3000/metrics | Prometheus scrape |
| Prometheus | http://localhost:9090 | Consultas de métricas |
| Grafana | http://localhost:3001 | Dashboards (admin / admin) |
| Jaeger UI | http://localhost:16686 | Trazas distribuidas |
| Kibana | http://localhost:5601 | Logs ELK (solo con `--profile elk`) |
| gRPC service | localhost:50051 | Microservicio de notificaciones |

### Parar los servicios

```bash
docker compose down          # para, conserva datos
docker compose down -v       # para y borra volúmenes
```

## API REST — Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registro |
| POST | `/api/auth/login` | Login → JWT |
| GET | `/api/dashboard/stats` | Estadísticas globales |
| GET/POST/PUT/DELETE | `/api/appointments` | Agenda de citas |
| GET/POST/PUT/DELETE | `/api/budgets` | Presupuestos |
| GET/POST | `/api/messages` | Bandeja omnicanal |
| POST | `/api/notifications/send` | Envía notificación via gRPC |
| GET | `/api/notifications/stats` | Estadísticas del microservicio |

## Arquitectura de observabilidad

```
Backend (Express)
  │
  ├─── /metrics ──────────────► Prometheus ──► Grafana
  │
  ├─── OTel SDK ──────────────► OTel Collector ──► Jaeger ──► Grafana
  │
  └─── Winston (stdout JSON) ─► Logstash ──► Elasticsearch ──► Kibana
```

## Comunicación gRPC

```
Backend (API Gateway)
  │
  └─── gRPC client ──────────► notifications-service (port 50051)
         │                        ├── Send(recipient, content, channel)
         │                        └── GetStats()
         │
  REST: POST /api/notifications/send
        GET  /api/notifications/stats
```

## Credenciales de prueba

| Usuario | Email | Contraseña |
|---------|-------|-----------|
| Administrador | admin@gmail.com | admin |
| Gorka Etxeberria | gorka@gudi.com | password123 |
| Mario Fernández | mario@gudi.com | password123 |

## Equipo

| Miembro | Rol |
|---------|-----|
| Izan | Líder técnico — backend y arquitectura |
| Gorka | Desarrollo frontend |
| Mario | Diseño, documentación y pruebas |

## Estado del desarrollo

| Fase | Descripción | Estado |
|------|-------------|--------|
| 1 | Preparación del proyecto y entorno | ✅ |
| 2 | Autenticación y usuarios | ✅ |
| 3 | Panel de control (Dashboard) | ✅ |
| 4 | Módulo de agenda | ✅ |
| 5 | Presupuestación | ✅ |
| 6 | Bandeja omnicanal y mensajería | ✅ |
| Extra | Observabilidad + gRPC microservice | ✅ |

## Repositorio

https://github.com/IzanUrrutikoetxea/GUDI-web-app
