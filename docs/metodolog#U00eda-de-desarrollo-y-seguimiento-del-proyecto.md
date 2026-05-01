## 1. Control de versiones y repositorio del proyecto

El desarrollo de la aplicación web **GUDI** se gestionará mediante un sistema de control de versiones basado en **Git**, utilizando la plataforma **GitHub** como repositorio central del proyecto.

Este repositorio permitirá almacenar todo el código fuente del sistema, así como registrar el historial completo de cambiozs realizados durante el desarrollo. Gracias a este sistema, cada modificación queda registrada junto con la fecha, el autor y la descripción del cambio, lo que permite realizar un seguimiento detallado del progreso del proyecto.

El profesor tendrá acceso al repositorio como **colaborador**, lo que le permitirá consultar en cualquier momento:

- El código fuente actualizado del proyecto.
- El historial de cambios (commits).
- Las distintas versiones del sistema.
- Las ramas de desarrollo utilizadas por el equipo.
- Las tareas y funcionalidades implementadas en cada fase del proyecto.

---

## 2. Estructura del repositorio

El repositorio seguirá una estructura modular acorde con la arquitectura técnica del sistema descrita en el proyecto:

gudi-webapp  
│  
├── frontend        (Aplicación cliente en React + TypeScript)  
├── backend         (API y lógica del servidor en Node.js + TypeScript)  
├── database        (Modelos y migraciones con Prisma y PostgreSQL)  
├── infra           (Configuración de servicios e integraciones)  
└── docs            (Documentación del proyecto)

Esta organización permite separar claramente las diferentes capas de la aplicación y facilita el trabajo colaborativo del equipo.

---

## 3. Flujo de trabajo del equipo

El equipo utilizará un flujo de trabajo basado en **ramas de desarrollo**, que permite trabajar en paralelo sin afectar a la versión principal del proyecto.

Las ramas principales serán:

- **main**  
    Contiene la versión estable del proyecto.
    
- **develop**  
    Rama donde se integran las nuevas funcionalidades antes de pasar a producción.
    
- **feature/_nombre-funcionalidad**_  
    Ramas utilizadas para desarrollar nuevas funcionalidades específicas del sistema, como por ejemplo:
    
    - `feature/panel-control`
    - `feature/agenda`
    - `feature/mensajeria`
        

Cuando una funcionalidad está finalizada, se integra mediante un **Pull Request**, permitiendo revisar los cambios antes de incorporarlos al proyecto principal.

---

## 4. Seguimiento del progreso

El profesor podrá seguir el avance del proyecto mediante los siguientes mecanismos:

### Historial de commits

Cada avance del proyecto se registrará mediante commits documentados, que incluirán una descripción clara de la funcionalidad implementada o modificación realizada.

### Pull Requests

Las nuevas funcionalidades se integrarán mediante Pull Requests, lo que permitirá revisar los cambios realizados por cada miembro del equipo.

### Actividad del repositorio

GitHub ofrece un registro completo de la actividad del proyecto, incluyendo:

- Contribuciones de cada miembro del equipo
    
- Frecuencia de actualizaciones
    
- Evolución del código
    

---

## 5. Acceso del profesor al repositorio

El profesor será añadido como **colaborador del repositorio de GitHub**, lo que le permitirá acceder al proyecto en cualquier momento para revisar su evolución.

El acceso se realizará mediante la siguiente URL del repositorio:

https://github.com/IzanUrrutikoetxea/GUDI-web-app

Desde esta plataforma podrá consultar tanto el código como la documentación y el historial completo de desarrollo del sistema.