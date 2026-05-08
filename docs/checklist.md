# Checklist de Desarrollo — GUDI Web App

Checklist ordenado por fases, desde la configuración inicial hasta la entrega de la Fase 6.

---

## Configuración previa del repositorio

- [x] Crear repositorio en GitHub (`GUDI-web-app`)
- [ ] Crear rama `main` y `develop` ⚠️ La rama `develop` no existe — solo hay ramas `feature/*` y `main`
- [x] Añadir al profesor como colaborador del repositorio
- [x] Crear estructura de carpetas raíz: `frontend/`, `backend/`, `docs/`
- [x] Crear `README.md` con descripción del proyecto, tecnologías, estructura y cómo ejecutarlo
- [x] Crear `.gitignore` (incluir `node_modules/`, `.env`, `dist/`)

---

## Docker y entorno de pruebas

- [ ] Crear `Dockerfile` para el backend
- [ ] Crear `Dockerfile` para el frontend
- [ ] Crear `docker-compose.yml` en la raíz del proyecto con los servicios:
  - `backend` (Node.js)
  - `frontend` (React, Vite o Nginx)
  - `db` (PostgreSQL)
- [ ] Definir variables de entorno en `docker-compose.yml` o mediante archivo `.env`
- [x] Crear `backend/.env.example` con variables de ejemplo (`PORT`, `DATABASE_URL`, `JWT_SECRET`)
- [ ] Verificar que `docker compose up` levanta todos los servicios correctamente
- [ ] Verificar que el frontend accede al backend desde el contenedor
- [ ] Verificar que el backend conecta con PostgreSQL desde el contenedor
- [ ] Documentar en el `README.md` cómo ejecutar el proyecto con Docker

---

## FASE 1 — Preparación del proyecto y entorno de desarrollo

### Backend (Izan)
- [x] Inicializar proyecto Node.js con TypeScript en `backend/`
- [x] Configurar `tsconfig.json`
- [x] Instalar dependencias: `express`, `cors`, `dotenv`, `typescript`, `ts-node-dev`
- [x] Crear estructura de carpetas: `src/config/`, `src/routes/`, `src/controllers/`, `src/services/`, `src/middlewares/`
- [x] Crear `src/app.ts` con Express, CORS y JSON middleware
- [x] Crear `src/server.ts` que levanta el servidor en el puerto configurado
- [x] Crear `src/config/env.ts` para leer variables de entorno
- [x] Instalar y configurar Prisma: `npx prisma init`
- [x] Configurar `DATABASE_URL` en `.env`
- [x] Crear `src/config/prisma.ts` con el cliente de Prisma
- [x] Crear scripts en `package.json`: `dev`, `build`, `start`
- [ ] Crear endpoint de prueba `GET /api/health` que devuelva `{ status: "ok" }`

### Frontend (Gorka)
- [x] Inicializar proyecto React + TypeScript con Vite en `frontend/`
- [x] Instalar dependencias base
- [x] Crear estructura de carpetas: `src/hooks/`, `src/layouts/`, `src/services/`, `src/types/`
- [ ] Crear estructura de carpetas: `src/components/`, `src/pages/`
- [ ] Crear página de inicio básica (`HomePage`)
- [ ] Verificar comunicación con el backend (llamada a `/api/health`)

### Documentación (Mario)
- [x] Documentar estructura del repositorio en `README.md`
- [ ] Completar `README.md` con instrucciones de ejecución local, equipo y estado del proyecto
- [ ] Probar que el proyecto se ejecuta localmente (sin Docker)
- [ ] Probar que el proyecto se ejecuta con Docker

---

## FASE 2 — Autenticación y usuarios

### Backend (Izan)
- [x] Definir modelo `User` en `prisma/schema.prisma` (id, nombre, email, contraseña, rol)
- [x] Ejecutar migración: `npx prisma migrate dev --name update_user_for_auth`
- [x] Instalar `bcrypt` y `jsonwebtoken`
- [x] Crear `authService.ts`: registro, login, hash de contraseña, generación de JWT
- [x] Crear `authController.ts`: `POST /api/auth/register`, `POST /api/auth/login`
- [x] Crear `authMiddleware.ts` para proteger rutas privadas con JWT
- [x] Crear `authRoutes.ts` y registrarlas en `app.ts`
- [x] Configurar `JWT_SECRET` en `.env`

### Frontend (Gorka)
- [ ] Crear página de login (`LoginPage`)
- [ ] Crear página de registro (`RegisterPage`)
- [ ] Crear formularios React con validaciones básicas
- [ ] Crear `services/authService.ts` para llamadas a la API de autenticación
- [ ] Guardar JWT en `localStorage` o contexto tras login exitoso
- [ ] Redirigir al dashboard tras login exitoso

### Diseño y documentación (Mario)
- [ ] Aplicar CSS básico a las páginas de login y registro
- [ ] Documentar endpoints de autenticación en `docs/`

---

## FASE 3 — Panel de Control (Dashboard)

### Backend (Izan)
- [x] Crear endpoint `GET /api/dashboard/stats` que devuelva estadísticas básicas
- [x] Crear `dashboardService.ts` con la lógica de consulta
- [x] Proteger el endpoint con `authMiddleware`

### Frontend (Gorka)
- [ ] Crear página de dashboard (`DashboardPage`)
- [ ] Crear componentes de tarjetas de estadísticas
- [ ] Implementar layout general con menú lateral y header (`layouts/`)
- [ ] Conectar con `GET /api/dashboard/stats`
- [ ] Mostrar actividad reciente

### Diseño (Mario)
- [ ] Aplicar CSS al dashboard
- [ ] Añadir iconos a las tarjetas
- [ ] Ajustes visuales generales del layout

---

## FASE 4 — Módulo de Agenda

### Backend (Izan)
- [x] Definir modelo `Appointment` en `schema.prisma` (id, título, fecha, descripción, userId)
- [x] Ejecutar migración
- [x] Crear `appointmentService.ts` con operaciones CRUD
- [x] Crear `appointmentController.ts` con endpoints:
  - `GET /api/appointments`
  - `POST /api/appointments`
  - `PUT /api/appointments/:id`
  - `DELETE /api/appointments/:id`
- [x] Crear `appointmentRoutes.ts` y registrarlas
- [x] Proteger todos los endpoints con `authMiddleware`

### Frontend (Gorka)
- [ ] Crear página de agenda (`AgendaPage`)
- [ ] Crear formulario para crear/editar citas
- [ ] Crear lista de citas
- [ ] Crear `services/appointmentService.ts`
- [ ] Conectar formulario y lista con la API

### Diseño y pruebas (Mario)
- [ ] Crear vista de calendario simple
- [ ] Aplicar estilos al calendario y lista de citas
- [ ] Probar flujo completo de creación, edición y eliminación de citas

---

## FASE 5 — Presupuestación

### Backend (Izan)
- [x] Definir modelo `Budget` en `schema.prisma` (id, título, cliente, items, total, userId)
- [x] Ejecutar migración
- [x] Crear `budgetService.ts` con lógica de cálculo y CRUD
- [x] Crear `budgetController.ts` con endpoints:
  - `GET /api/budgets`
  - `POST /api/budgets`
  - `PUT /api/budgets/:id`
  - `DELETE /api/budgets/:id`
- [x] Crear `budgetRoutes.ts` y registrarlas
- [x] Proteger endpoints con `authMiddleware`

### Frontend (Gorka)
- [ ] Crear página de presupuestos (`BudgetsPage`)
- [ ] Crear formulario de presupuesto (con líneas de items y cálculo de total)
- [ ] Crear tabla de presupuestos existentes
- [ ] Crear `services/budgetService.ts`
- [ ] Conectar con la API

### Diseño y pruebas (Mario)
- [ ] Aplicar estilos al módulo de presupuestos
- [ ] Implementar opción de generar/exportar documento (PDF o vista imprimible)
- [ ] Probar flujo completo de creación y edición de presupuestos

---

## FASE 6 — Bandeja Omnicanal y Mensajería

### Backend (Izan)
- [x] Definir modelo `Message` en `schema.prisma` (id, remitente, canal, contenido, estado, userId)
- [x] Ejecutar migración
- [x] Crear `messageService.ts` con lógica de mensajería
- [x] Crear `messageController.ts` con endpoints:
  - `GET /api/messages`
  - `POST /api/messages`
- [x] Crear `messageRoutes.ts` y registrarlas
- [x] Proteger endpoints con `authMiddleware`
- [ ] Integrar API externa de correo (simulada o real)
- [ ] Crear simulación de bandeja de WhatsApp

### Frontend (Gorka)
- [ ] Crear página de mensajería (`MessagesPage`)
- [ ] Crear interfaz tipo chat
- [ ] Crear bandeja de mensajes con filtro por canal (email, WhatsApp)
- [ ] Crear `services/messageService.ts`
- [ ] Conectar con la API

### Diseño (Mario)
- [ ] Aplicar estilos al módulo de mensajería
- [ ] Diseño visual del chat y bandeja omnicanal
- [ ] Pruebas de experiencia de usuario

---

## Cierre y entrega

- [x] Revisar que todos los endpoints de la API están protegidos correctamente
- [ ] Verificar que el proyecto completo arranca con `docker compose up` sin errores
- [ ] Realizar pruebas de integración básicas (flujo login → dashboard → agenda → presupuestos → mensajería)
- [ ] Actualizar `README.md` con el estado final del proyecto
- [ ] Actualizar documentación en `docs/` si hay cambios relevantes
- [x] Verificar que `.env` no está subido al repositorio
- [x] Asegurarse de que el profesor tiene acceso al repositorio como colaborador
- [ ] Hacer merge de las ramas `feature/*` a `main` con la versión estable final
