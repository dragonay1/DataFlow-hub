# DataFlow Hub - Project Overview

DataFlow Hub es un sistema académico integral diseñado para la gestión de instituciones educativas. Este repositorio contiene el cliente web (frontend) de la aplicación.

## Propósito del Sistema
Administrar de manera eficiente el flujo de datos académicos, incluyendo:
- **Estudiantes**: Gestión de perfiles, inscripciones y progreso académico.
- **Docentes**: Administración de instructores y asignación de cursos.
- **Cursos y Matrículas**: Control de la oferta académica y procesos de inscripción.
- **Notas y Reportes**: Registro de calificaciones y generación de reportes de rendimiento.

## Arquitectura del Proyecto (Client)
- **Framework**: [React](https://reactjs.org/) con [TypeScript](https://www.typescriptlang.org/).
- **Build Tool**: [Vite](https://vitejs.dev/).
- **Estado Global**: 
  - [Redux Toolkit](https://redux-toolkit.js.org/) para estados compartidos de autenticación.
  - **Context API** para estados específicos de dominio (Cursos, Docentes, Estudiantes).
- **Material UI & Tailwind CSS**: Se utiliza **Material UI** para componentes de interfaz listos para usar y **Tailwind CSS** para el estilado personalizado. Las clases de Tailwind deben aplicarse directamente en el JSX.
  - Priorizar el uso de componentes de Material UI para elementos complejos (tablas, diálogos, selectores).
  - Utilizar Tailwind CSS para el layout, espaciado y ajustes finos de diseño.

## Estructura de Directorios Principal
- `src/components/`: Componentes reutilizables de la UI (Layout, Navbar, Sidebar) y específicos de módulos (Login).
- `src/context/`: Contextos de React para la lógica de negocio de Estudiantes, Docentes y Cursos.
- `src/pages/`: Vistas principales de la aplicación diferenciadas por roles (Admin, Docente, Estudiante).
- `src/shared/`: Servicios de API, utilidades y mocks para pruebas o desarrollo sin backend.
- `src/store/`: Configuración de Redux Toolkit y slices de estado.

## Integración con Backend
El proyecto cliente interactúa con una API backend ubicada en la carpeta raíz compartida (hermana de este repositorio). Utiliza servicios en `src/shared/services/` para la comunicación.

1 Es **obligatorio** consultar el archivo `..\DataFlowHub\DataFlowHub.Api\DataFlowHub.Api.http` del proyecto backend para obtener los endpoints disponibles, ejemplos de peticiones y estructuras de datos esperadas.
- **Autenticación**: Utiliza JWT (Bearer Token). El flujo de login requiere `username` y `password`.


## Roles de Usuario
- **Administrador**: Control total del sistema.
- **Docente**: Gestión de sus cursos y estudiantes asignados.
- **Estudiante**: Acceso a cursos, calificaciones y perfil personal.

### Manejo de Formularios (Formik & Yup)
Se utiliza **Formik** para el manejo del estado del formulario y **Yup** para los esquemas de validación.
- **Esquemas de Validación**: Deben crearse en archivos independientes con extensión `.schema.ts` dentro de `src/schemas/`.
- **Hooks de Formulario**: Se deben crear hooks independientes por cada funcionalidad en `src/hooks/` (ej. `useUserForm.ts`) que encapsulen la lógica de Formik y el uso de los esquemas.
- **Validación Visual**: Los formularios deben mostrar mensajes de error claros y utilizar estilos visuales (ej. bordes rojos) para campos inválidos.
