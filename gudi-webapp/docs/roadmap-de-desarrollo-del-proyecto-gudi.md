El desarrollo del sistema se organizará en **6 fases progresivas**, comenzando por la configuración del proyecto y finalizando con la integración completa de los módulos funcionales.

---

# FASE 1 — Preparación del proyecto y entorno de desarrollo

Duración estimada: **1 semana** 
Fecha esperada: 15 de marzo

Objetivo: establecer la base técnica del proyecto.

### Tareas

- Crear repositorio en GitHub
- Configurar estructura del proyecto
- Crear frontend base (React + TypeScript)
- Crear backend base (Node.js + TypeScript)
- Configurar PostgreSQL + Prisma
- Conectar frontend y backend
### Responsable

**Izan**
- Crear arquitectura del proyecto
- Configurar backend Node
- Configurar Prisma y PostgreSQL
- Crear API básica

**Gorka**
- Crear proyecto React
- Configurar TypeScript
- Instalar dependencias
- Crear primera página básica

**Mario**
- Crear README del proyecto
- Documentar estructura del repositorio
- Probar que el proyecto se ejecuta localmente

---

# FASE 2 — Autenticación y usuarios

Duración estimada: **1 semana**
Fecha esperada: 2 de marzo
Objetivo: permitir acceso al sistema mediante usuarios.
### Funcionalidades

- Registro de usuario
- Login
- Autenticación JWT
- Roles básicos (admin / usuario)
### Responsable

**Izan**
- API de autenticación
- Seguridad JWT
- Modelos de usuario en Prisma

**Gorka**
- Pantallas de login y registro
- Formularios React
- Validaciones básicas

**Mario**
- Diseño simple de la página de login
- CSS básico
- Documentar endpoints de autenticación

---

# FASE 3 — Panel de Control (Dashboard)

Duración estimada: **1 semana**
Fecha esperada: 29 de marzo
El panel mostrará información global del sistema.
### Funcionalidades

- Panel principal
- Estadísticas básicas
- Actividad reciente
### Responsable

**Izan**
- API de estadísticas
- Lógica de obtención de datos
- Optimización de consultas

**Gorka**
- Diseño del dashboard en React
- Tarjetas de estadísticas
- Layout general

**Mario**
- CSS del dashboard
- Iconos
- Ajustes visuales

---

# FASE 4 — Módulo de Agenda

Duración estimada: **1 semana**
Fecha esperada: 5 de abril
Este es uno de los módulos más importantes.

### Funcionalidades

- Crear cita
- Editar cita
- Eliminar cita
- Ver calendario

### Responsable

**Izan**
- Modelo de citas en Prisma
- API CRUD de citas
- Gestión de fechas

**Gorka**
- Formularios para crear citas
- Lista de citas
- Integración con API

**Mario**
- Vista calendario simple
- Estilos del calendario
- Pruebas de uso
    

---

# FASE 5 — Presupuestación
Duración estimada: **1 semana**
Fecha esperada: 12 de abril
Sistema para generar presupuestos.

### Funcionalidades

- Crear presupuesto
- Editar presupuesto
- Generar documento

### Responsable

**Izan**
- API de presupuestos
- Lógica de cálculo

**Gorka**
- Formulario de presupuesto
- Tabla de presupuestos

**Mario**
- Diseño visual
- Estilos
- Pruebas de uso
    

---

# FASE 6 — Bandeja Omnicanal y Mensajería

Duración estimada: **1 semana**
Fecha esperada: 19 de abril
Centralización de comunicaciones.

### Funcionalidades
- Bandeja de mensajes
- Integración correo
- Simulación de WhatsApp
    

### Responsable

**Izan**
- Integración APIs
- Backend de mensajes

**Gorka**
- Interfaz tipo chat
- Bandeja de mensajes

**Mario**
- Diseño del chat
- Experiencia visual

---

# FASE FINAL — Integración IA (n8n + OpenAI)

Duración estimada: **1 semana**
Fecha esperada: 26 de abril
Funcionalidades inteligentes.

### Ejemplos
- Generación automática de respuestas
- Automatización de mensajes
- Recordatorios automáticos

### Responsable

**Izan**
- Configuración n8n
- Integración OpenAI

**Gorka**
- Botón de generación automática
    
**Mario**
- Documentación del funcionamiento
    

---

# Resumen de reparto de trabajo

| Persona | Rol                    | Responsabilidades                                   |
| ------- | ---------------------- | --------------------------------------------------- |
| Izan    | Líder técnico          | Backend, base de datos, arquitectura, integraciones |
| Gorka   | Desarrollador frontend | Interfaces React, formularios, conexión API         |
| Mario   | Soporte y UI           | CSS, diseño, documentación y pruebas                |

---

# Flujo de trabajo recomendado en GitHub

Cada funcionalidad se desarrolla en ramas:

main  
develop  
feature/login  
feature/dashboard  
feature/agenda  
feature/presupuestos  
feature/mensajeria

El proceso será:

1. Crear rama de funcionalidad
2. Desarrollar funcionalidad
3. Hacer **commit**
4. Crear **Pull Request**
5. Revisar cambios
6. Integrar en `develop`