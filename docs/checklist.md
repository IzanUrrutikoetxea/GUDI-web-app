# Checklist de Desarrollo — GUDI Web App

Checklist ordenado por fases, desde la configuración inicial hasta la entrega de la Fase 6.

---

## Configuración previa del repositorio

- [x] Crear repositorio en GitHub (`GUDI-web-app`)
- [x] Crear rama `main` y `develop`
- [x] Añadir al profesor como colaborador del repositorio
- [x] Crear estructura de carpetas raíz: `frontend/`, `backend/`, `docs/`
- [x] Crear `README.md` con descripción del proyecto, tecnologías, estructura y cómo ejecutarlo
- [x] Crear `.gitignore` (incluir `node_modules/`, `.env`, `dist/`)

---

## Docker y entorno de pruebas

- [x] Crear `Dockerfile` para el backend
- [x] Crear `Dockerfile` para el frontend
- [x] Crear `docker-compose.yml` en la raíz del proyecto con los servicios:
  - `backend` (Node.js)
  - `frontend` (React, Vite)
  - `db` (PostgreSQL)
- [x] Definir variables de entorno en `docker-compose.yml`
- [x] Crear `backend/.env.example` con variables de ejemplo (`PORT`, `DATABASE_URL`, `JWT_SECRET`)
- [ ] Verificar que `docker compose up` levanta todos los servicios correctamente
- [ ] Verificar que el frontend accede al backend desde el contenedor
- [ ] Verificar que el backend conecta con PostgreSQL desde el contenedor
- [x] Documentar en el `README.md` cómo ejecutar el proyecto con Docker

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
- [x] Crear endpoint de prueba `GET /api/health` que devuelva `{ status: "ok" }`

### Frontend (Gorka)
- [x] Inicializar proyecto React + TypeScript con Vite en `frontend/`
- [x] Instalar dependencias base
- [x] Crear estructura de carpetas: `src/components/`, `src/pages/`, `src/hooks/`, `src/layouts/`, `src/services/`, `src/types/`
- [x] Crear página de inicio básica (`HomePage`) con indicador de estado del servidor
- [x] Verificar comunicación con el backend (llamada a `/api/health`)

### Documentación (Mario)
- [x] Documentar estructura del repositorio en `README.md`
- [x] Completar `README.md` con instrucciones de ejecución local y con Docker
- [ ] Probar que el proyecto se ejecuta localmente (sin Docker)
- [ ] Probar que el proyecto se ejecuta con Docker

---

## FASE 2 — Autenticación y usuarios

### Backend (Izan)
- [x] Definir modelo `User` en `prisma/schema.prisma` (id, nombre, email, contraseña, rol)
- [x] Ejecutar migración
- [x] Instalar `bcrypt` y `jsonwebtoken`
- [x] Crear `authService.ts`: registro, login, hash de contraseña, generación de JWT
- [x] Crear `authController.ts`: `POST /api/auth/register`, `POST /api/auth/login`
- [x] Crear `authMiddleware.ts` para proteger rutas privadas con JWT
- [x] Crear `authRoutes.ts` y registrarlas en `app.ts`
- [x] Configurar `JWT_SECRET` en `.env`

### Frontend (Gorka)
- [x] Crear página de login (`LoginPage`)
- [x] Crear página de registro (`RegisterPage`)
- [x] Crear formularios React con validaciones básicas
- [x] Crear `services/authService.ts` para llamadas a la API de autenticación
- [x] Guardar JWT en `localStorage` tras login exitoso
- [x] Redirigir al dashboard tras login exitoso

### Diseño y documentación (Mario)
- [x] Aplicar CSS a las páginas de login y registro
- [ ] Documentar endpoints de autenticación en `docs/`

---

## FASE 3 — Panel de Control (Dashboard)

### Backend (Izan)
- [x] Crear endpoint `GET /api/dashboard/stats` que devuelva estadísticas básicas
- [x] Crear `dashboardService.ts` con la lógica de consulta
- [x] Proteger el endpoint con `authMiddleware`

### Frontend (Gorka)
- [x] Crear página de dashboard (`DashboardPage`)
- [x] Crear componentes de tarjetas de estadísticas
- [x] Implementar layout general con menú lateral (`MainLayout`)
- [x] Conectar con `GET /api/dashboard/stats`
- [x] Mostrar actividad reciente (usuarios recientes)

### Diseño (Mario)
- [x] Aplicar CSS al dashboard y sidebar
- [x] Tarjetas de estadísticas con colores diferenciados

---

## FASE 4 — Módulo de Agenda

### Backend (Izan)
- [x] Definir modelo `Appointment` en `schema.prisma`
- [x] Ejecutar migración
- [x] Crear `appointmentService.ts` con operaciones CRUD
- [x] Crear `appointmentController.ts` con todos los endpoints
- [x] Crear `appointmentRoutes.ts` registradas y protegidas

### Frontend (Gorka)
- [x] Crear página de agenda (`AgendaPage`)
- [x] Crear formulario para crear/editar citas (modal)
- [x] Crear lista de citas
- [x] Crear `services/appointmentService.ts`
- [x] Conectar formulario y lista con la API

### Diseño y pruebas (Mario)
- [x] Aplicar estilos al módulo de agenda
- [ ] Probar flujo completo de creación, edición y eliminación de citas

---

## FASE 5 — Presupuestación

### Backend (Izan)
- [x] Definir modelo `Budget` en `schema.prisma` con items y cálculo
- [x] Ejecutar migración
- [x] Crear `budgetService.ts` con lógica de cálculo y CRUD
- [x] Crear `budgetController.ts` con todos los endpoints incluido `/document`
- [x] Crear `budgetRoutes.ts` registradas y protegidas

### Frontend (Gorka)
- [x] Crear página de presupuestos (`BudgetsPage`)
- [x] Crear formulario con líneas de items y cálculo de total en tiempo real
- [x] Crear tabla de presupuestos existentes
- [x] Crear `services/budgetService.ts`
- [x] Conectar con la API

### Diseño y pruebas (Mario)
- [x] Aplicar estilos al módulo de presupuestos
- [x] Vista de documento/presupuesto con opción de imprimir
- [ ] Probar flujo completo de creación y edición de presupuestos

---

## FASE 6 — Bandeja Omnicanal y Mensajería

### Backend (Izan)
- [x] Definir modelo `Message` en `schema.prisma`
- [x] Ejecutar migración
- [x] Crear `messageService.ts` con lógica de mensajería
- [x] Crear `messageController.ts` con todos los endpoints
- [x] Crear `messageRoutes.ts` registradas y protegidas

### Frontend (Gorka)
- [x] Crear página de mensajería (`MessagesPage`)
- [x] Crear interfaz tipo cliente de correo (lista + detalle)
- [x] Filtros por canal (Email, WhatsApp, Interno) y estado
- [x] Crear `services/messageService.ts`
- [x] Conectar con la API (crear, leer, archivar, eliminar)

### Diseño (Mario)
- [x] Aplicar estilos al módulo de mensajería
- [x] Layout de dos columnas (bandeja + vista de mensaje)
- [ ] Pruebas de experiencia de usuario

---

## Cierre y entrega

- [x] Todos los endpoints de la API están protegidos con JWT
- [ ] Verificar que el proyecto completo arranca con `docker compose up` sin errores
- [ ] Realizar pruebas de integración (flujo login → dashboard → agenda → presupuestos → mensajería)
- [ ] Actualizar `README.md` con el estado final del proyecto
- [x] Verificar que `.env` no está subido al repositorio
- [x] Profesor tiene acceso al repositorio como colaborador
- [ ] Hacer merge de `develop` a `main` con la versión estable final
