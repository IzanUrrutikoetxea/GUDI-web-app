## 1. Objetivo del documento

Este documento establece las normas y criterios de desarrollo que seguirá el equipo durante la implementación de la aplicación web **GUDI**.

Su objetivo es garantizar que todos los miembros del equipo trabajen bajo una metodología común, manteniendo la coherencia del código, la organización del proyecto y la correcta integración de las distintas funcionalidades del sistema.

---

# 2. Control de versiones

El proyecto utilizará **Git** como sistema de control de versiones y **GitHub** como repositorio central del proyecto.

El repositorio almacenará:
- El código fuente completo del sistema
- El historial de cambios del proyecto
- La documentación técnica
- Las distintas versiones del desarrollo

Cada modificación del proyecto se registrará mediante **commits**, lo que permitirá realizar un seguimiento detallado de la evolución del sistema.

---

# 3. Estructura del repositorio

El repositorio seguirá la estructura definida en el documento de arquitectura del proyecto:

`gudi-webapp/`  
`├── frontend/`  
`├── backend/`  
`├── docs/`  
`└── README.md`

Dentro del backend se utilizará la siguiente organización:

`backend/`  
`├── prisma/`  
`├── src/`  
`│   ├── config/`  
`│   ├── routes/`  
`│   ├── controllers/`  
`│   ├── services/`  
`│   ├── middlewares/`  
`│   ├── app.ts`  
`│   └── server.ts`

Esta estructura permite separar correctamente las responsabilidades del sistema:

|Carpeta|Función|
|---|---|
|frontend|Interfaz de usuario desarrollada en React|
|backend|API y lógica del servidor|
|prisma|Modelos y migraciones de la base de datos|
|config|Configuraciones del sistema|
|routes|Definición de endpoints de la API|
|controllers|Gestión de peticiones y respuestas|
|services|Lógica de negocio|
|middlewares|Validaciones y control de acceso|
|docs|Documentación técnica del proyecto|

---

# 4. Flujo de trabajo con Git

El desarrollo se organizará mediante **ramas de desarrollo** para evitar conflictos entre los distintos miembros del equipo.

### Ramas principales

- **main**  
    Contiene la versión estable del proyecto.
- **develop**  
    Rama de integración donde se incorporan las nuevas funcionalidades.
### Ramas de funcionalidad

Cada nueva funcionalidad se desarrollará en una rama independiente siguiendo el formato:

`feature/nombre-funcionalidad`

Ejemplos:

`feature/login`  
`feature/dashboard`  
`feature/agenda`  
`feature/mensajeria`

---

# 5. Proceso de desarrollo de nuevas funcionalidades

Para desarrollar una nueva funcionalidad se seguirá el siguiente proceso:

1. Crear una nueva rama desde `develop`.
2. Implementar la funcionalidad correspondiente.
3. Realizar commits descriptivos durante el desarrollo.
4. Crear un **Pull Request** hacia la rama `develop`.
5. Revisar los cambios antes de integrarlos.
6. Fusionar la rama una vez aprobada.

Este proceso permite mantener un desarrollo ordenado y evitar errores en la integración del sistema.

---

# 6. Normas de commits

Los commits deben ser claros y describir correctamente los cambios realizados.

Formato recomendado:

tipo: descripción breve del cambio

Ejemplos:

`feat: añadir endpoint de usuarios`  
`fix: corregir error en autenticación`  
`docs: actualizar documentación del proyecto`  
`refactor: reorganizar estructura de servicios`

Tipos de commit recomendados:

|Tipo|Uso|
|---|---|
|feat|Nueva funcionalidad|
|fix|Corrección de errores|
|docs|Cambios en documentación|
|refactor|Mejora interna del código|
|style|Cambios de formato o estilo|
|test|Añadir o modificar pruebas|

---

# 7. Convenciones de código

Para mantener la coherencia del proyecto se seguirán las siguientes convenciones:
### Lenguaje

Todo el código del proyecto se desarrollará en **TypeScript**.

### Idioma

El código utilizará **inglés** para nombres de variables, funciones y archivos.

Ejemplo:
`createUser`  
`getAppointments`  
`budgetService`

### Nombres de archivos

Se utilizará **camelCase** o **kebab-case** según el contexto.

Ejemplos:

`userController.ts`  
`appointmentService.ts`  
`authMiddleware.ts`

### Separación de responsabilidades

El backend seguirá la siguiente arquitectura:

- **Routes** → definen las rutas de la API
- **Controllers** → gestionan la petición y respuesta
- **Services** → contienen la lógica de negocio

Esto evita concentrar demasiada lógica en un solo archivo y facilita el mantenimiento del código.

---

# 8. Variables de entorno

Las configuraciones sensibles se almacenarán en el archivo:

`backend/.env`

Ejemplo:

`PORT=3000`  
`DATABASE_URL=postgresql://...`  
`JWT_SECRET=clave_secreta`

Este archivo **no se subirá al repositorio** para evitar exponer información sensible.

En su lugar se incluirá un archivo:

`.env.example`

con valores de ejemplo.

---

# 9. Documentación del proyecto

Toda la documentación del proyecto se almacenará en la carpeta:

`docs/`

Actualmente incluye:

- Arquitectura del proyecto
- Metodología de desarrollo
- Roadmap de desarrollo
- Normas de desarrollo

La documentación deberá actualizarse cuando se introduzcan cambios importantes en el sistema.

---

# 10. Responsabilidades del equipo

El desarrollo del proyecto se divide entre tres miembros del equipo:

|Miembro|Rol|
|---|---|
|Izan|Líder técnico, backend y arquitectura|
|Gorka|Desarrollo frontend|
|Mario|Diseño, documentación y soporte|

Cada miembro será responsable de las tareas asignadas en el **roadmap de desarrollo del proyecto**.

---

# 11. Buenas prácticas de desarrollo

Para asegurar la calidad del proyecto se seguirán las siguientes recomendaciones:

- Realizar **commits frecuentes**
- Mantener el código limpio y organizado
- Documentar cambios importantes
- Revisar el código antes de integrarlo
- Mantener la estructura del proyecto definida