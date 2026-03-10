
Este documento es una versión mas extensa del documento ha presentar el día 6 de marzo: [[Metodología de desarrollo y seguimiento del proyecto]]
# Stack técnico

`gudi-webapp`  
`│`  
`├── frontend        (Aplicación cliente en React + TypeScript)`  
`├── backend         (API y lógica del servidor en Node.js + TypeScript)`  
`├── database        (Modelos y migraciones con Prisma y PostgreSQL)`  
`├── infra           (Configuración de servicios e integraciones)`  
`└── docs            (Documentación del proyecto)`

**React**  
Biblioteca de JavaScript para construir interfaces de usuario interactivas basadas en componentes re utilizables. Se utiliza principalmente para desarrollar aplicaciones web dinámicas y modernas.  
[https://react.dev](https://react.dev)

**TypeScript**  
Lenguaje de programación que amplía JavaScript añadiendo tipado estático, lo que ayuda a detectar errores antes de ejecutar el código y mejora la mantenibilidad del proyecto.  
[https://www.typescriptlang.org](https://www.typescriptlang.org)

**Node.js**  
Entorno de ejecución que permite ejecutar JavaScript en el servidor, facilitando la creación de APIs, servicios backend y aplicaciones web completas.  
[https://nodejs.org](https://nodejs.org)

**Prisma**  
ORM moderno para Node.js y TypeScript que simplifica el acceso y la gestión de bases de datos mediante modelos definidos en código y consultas tipadas.  
[https://www.prisma.io](https://www.prisma.io)

**PostgreSQL**  
Sistema de gestión de bases de datos relacional de código abierto, conocido por su robustez, fiabilidad y capacidad para manejar grandes volúmenes de datos.  
[https://www.postgresql.org](https://www.postgresql.org)

# Estructura del repositorio:

`gudi-webapp/`  
`├── frontend/`  
`├── backend/`  
`│ ├── prisma/`  
`│ ├── src/`  
`│ │ ├── config/`  
`│ │ ├── routes/`  
`│ │ ├── controllers/`  
`│ │ ├── services/`  
`│ │ ├── middlewares/`  
`│ │ ├── app.ts`  
`│ │ └── server.ts`  
`│ ├── .env`  
`│ ├── package.json`  
`│ └── tsconfig.json`  
`├── docs/`  
`└── README.md`

#### **`gudi-webapp/`**
Es la **carpeta raíz del proyecto**. Aquí estará todo lo necesario para desarrollar la aplicación completa: frontend, backend, documentación y configuración general.

#### `frontend/`
Aquí irá **toda la parte visual de la aplicación**, es decir, lo que ve y usa el usuario en el navegador.

Estructura del frontend temporal:

`frontend/`
`├── src/`
`│   ├── components/`
`│   ├── pages/`
`│   ├── layouts/`
`│   ├── services/`
`│   ├── hooks/`
`│   ├── types/`
`│   ├── App.tsx`
`│   └── main.tsx`
`├── public/`
`├── package.json`
`└── tsconfig.json`

##### Qué irá dentro
- **components/**: botones, tablas, cards, formularios **reutilizables**
- **pages/**: páginas completas como login, agenda, dashboard
- **layouts/**: estructura general de páginas, menú lateral, header
- **services/**: llamadas al backend, por ejemplo a `/api/users`
- **hooks/**: lógica reutilizable de React
- **types/**: tipos e interfaces TypeScript
- **App.tsx**: componente principal
- **main.tsx**: punto de entrada del frontend

#### `backend/`

Aquí estará **toda la lógica del servidor**, la API y la conexión con la base de datos.

Es la parte que se encarga de:
- recibir peticiones del frontend
- procesar datos
- guardar y leer información de PostgreSQL
- aplicar reglas de negocio

#### `backend/prisma/`

Aquí irá la **configuración de Prisma y el esquema de la base de datos**.

En principio tendrá:

`prisma/`
`├── schema.prisma`
`└── migrations/`

##### Qué irá dentro
- **schema.prisma**: define los modelos de base de datos, por ejemplo `User`, `Appointment`, `Budget`, `Message`
- **migrations/**: historial de cambios de la base de datos generado por Prisma
    
Ejemplo:
- crear tabla usuarios
- añadir tabla citas
- modificar campo email

#### `backend/src/`

Aquí irá el **código fuente principal del backend**.

Todo lo importante del servidor estará aquí organizado por responsabilidad.

#### `backend/src/config/`

Aquí irá la **configuración técnica reutilizable** del backend.
##### Qué puede haber aquí

- conexión con Prisma
- lectura de variables de entorno
- configuración del puerto
- configuración de herramientas externas

Ejemplos de archivos:
`config/`
`├── prisma.ts`
`├── env.ts`

###### Ejemplo de uso
- `prisma.ts`: crea y exporta el cliente Prisma
- `env.ts`: centraliza variables como `PORT` o `DATABASE_URL`

#### `backend/src/routes/`

Aquí se definirán las **rutas de la API**.
Las rutas indican qué URL responde a cada funcionalidad.

Ejemplo:
- `GET /api/users`
- `POST /api/appointments`
- `GET /api/budgets`
##### Ejemplo:

`routes/`
`├── index.ts`
`├── userRoutes.ts`
`├── appointmentRoutes.ts`
`├── budgetRoutes.ts`
`└── messageRoutes.ts`
###### Función
Cada archivo agrupa rutas de un módulo.

Por ejemplo:
- `userRoutes.ts` → rutas de usuarios
- `appointmentRoutes.ts` → rutas de agenda

#### `backend/src/controllers/`

Aquí irá el código que **recibe la petición y devuelve la respuesta**.
El controlador actúa como intermediario entre la ruta y la lógica del sistema.
##### Ejemplo:

`controllers/`
`├── userController.ts`
`├── appointmentController.ts`
`├── budgetController.ts`

##### Qué hace un controller

Por ejemplo, en usuarios:
- recoger datos del body
- llamar al service correspondiente
- devolver JSON
- manejar errores básicos

#### `backend/src/services/`

Aquí irá la **lógica de negocio**.
Esta es una de las carpetas más importantes, porque evita meter toda la lógica en los controllers.

##### Ejemplo:

`services/`
`├── userService.ts`
`├── appointmentService.ts`
`├── budgetService.ts`

##### Qué hace un service

Por ejemplo:
- validar reglas del negocio
- crear usuarios
- comprobar si una cita ya existe
- calcular un presupuesto
- consultar la base de datos con Prisma
##### Regla útil

- **route**: define la URL
- **controller**: recibe petición y responde
- **service**: resuelve la lógica real

#### `backend/src/middlewares/`

Aquí irán funciones que se ejecutan **antes de llegar al controlador**.
Sirven para aplicar comportamientos comunes.

##### Ejemplo:
`middlewares/`
`├── errorHandler.ts`
`├── authMiddleware.ts`
`└── validateRequest.ts`

###### Ejemplos de uso

- comprobar si el usuario está autenticado
- capturar errores
- validar datos antes de procesarlos
- proteger rutas privadas

Puede que nunca se llegue a usar, pero por el momento se contemplará la posibilidad.

#### `backend/src/app.ts`

Este archivo crea y configura la aplicación Express.
##### Qué habrá dentro
- creación de `express()`
- uso de `cors()`
- uso de `express.json()`
- carga de rutas
- configuración de middlewares
    
##### Función
Es donde se “monta” la app, pero **sin arrancar todavía el servidor**.

#### `backend/src/server.ts`

Este archivo se encarga de **levantar el servidor**.
##### Qué habrá dentro
- importar `app`
- leer el puerto
- hacer `app.listen(...)`

##### Función
Arrancar el backend para que responda en `localhost:XXXX` el puerto que elijamos.

#### `backend/.env`

Aquí irán las **variables de entorno**.
Sirven para guardar configuraciones sensibles o cambiables sin ponerlas directamente en el código.

##### Qué puede haber aquí

`PORT=XXXX`  el que elijamos
`DATABASE_URL="postgresql://postgres:password@localhost:5432/gudi_db? schema=public"`  
`JWT_SECRET="secreto_super_seguro"`

Este archivo normalmente **no se subirá a GitHub** dado que contiene datos sensibles.  
Por ello subiremos un `.env.example` con valores de ejemplo.

#### `backend/package.json`

Este archivo define el proyecto Node del backend.
##### Qué habrá dentro
- nombre del proyecto
- scripts
- dependencias
- versión
##### Ejemplo de scripts

- `npm run dev`
- `npm run build`
- `npm run start`

##### También incluye

Dependencias como:
- express
- prisma
- @prisma/client
- dotenv
- cors
- typescript

#### `backend/tsconfig.json`

Aquí se configura **cómo compila TypeScript** en el backend.
##### Qué controla
- versión de JavaScript generada
- carpeta de entrada y salida
- reglas estrictas de tipos
- compatibilidad de módulos

Una vez bien configurado no deberá de tocarse más salvo casos excepcionales

#### `docs/`

Aquí irá la **documentación del proyecto**.
Esta carpeta es muy útil porque separa la documentación técnica del código.
##### Qué habrá dentro

docs/  
├── metodología-de-desarrollo-y-seguimiento-del-proyecto.md  
├── roadmap-de-desarrollo-del-proyecto-gudi.md  
├── arquitectura-del-proyecto.md  
├── normas-de-desarrollo.md  

#### `README.md`

Es el documento principal del proyecto. Debe explicar de forma clara **qué es el proyecto y cómo ponerlo en marcha**.

##### Qué debería incluir

- nombre del proyecto
- descripción breve
- tecnologías usadas
- estructura del repositorio
- cómo ejecutar frontend y backend
- reparto del equipo
- enlace al repositorio
- estado actual del desarrollo

##### Objetivo

Que cualquier persona entre al repositorio y entienda:

- qué hemos hecho
- cómo está organizado
- cómo se ejecuta