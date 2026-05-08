# GUDI Web App

GUDI (Gestión Unificada Digital Inteligente) es una aplicación web para la digitalización y automatización inteligente de PYMEs.

## Tech stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Backend | Node.js + Express + TypeScript |
| Base de datos | PostgreSQL 16 |
| ORM | Prisma |

## Estructura del repositorio

```
gudi-webapp/
├── frontend/        # React + TypeScript (Vite)
├── backend/         # Node.js + Express + TypeScript
├── docs/            # Documentación técnica
├── docker-compose.yml
└── README.md
```

## Cómo ejecutar el proyecto

### Con Docker (recomendado)

Requisitos: [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
# Clonar el repositorio
git clone https://github.com/IzanUrrutikoetxea/GUDI-web-app.git
cd GUDI-web-app

# Arrancar todos los servicios
docker compose up --build
```

Una vez arrancado:

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| Health check | http://localhost:3000/api/health |

Para parar los servicios:
```bash
docker compose down
```

Para parar y eliminar los datos de la base de datos:
```bash
docker compose down -v
```

### Sin Docker (desarrollo local)

Requisitos: Node.js 20+, PostgreSQL

```bash
# Backend
cd backend
cp .env.example .env   # editar DATABASE_URL con tu PostgreSQL local
npm install
npx prisma migrate deploy
npm run dev

# Frontend (en otra terminal)
cd frontend
npm install
npm run dev
```

## Equipo

| Miembro | Rol |
|---------|-----|
| Izan | Líder técnico — backend y arquitectura |
| Gorka | Desarrollo frontend |
| Mario | Diseño, documentación y pruebas |

## Estado del desarrollo

| Fase | Descripción | Estado |
|------|-------------|--------|
| 1 | Preparación del proyecto y entorno | ✅ Completada |
| 2 | Autenticación y usuarios | 🔄 En progreso |
| 3 | Panel de control (Dashboard) | 🔄 En progreso |
| 4 | Módulo de agenda | 🔄 En progreso |
| 5 | Presupuestación | 🔄 En progreso |
| 6 | Bandeja omnicanal y mensajería | 🔄 En progreso |

## Repositorio

https://github.com/IzanUrrutikoetxea/GUDI-web-app
