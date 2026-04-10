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
- `src/components/`: Componentes reutilizables de la UI (Layout, Navbar, Sidebar).
- `src/context/`: Contextos de React para la lógica de negocio de Estudiantes, Docentes y Cursos (Estado local/Context API).
- `src/hooks/`: Hooks personalizados. Los hooks de formularios (ej. `useLoginForm.ts`) deben encapsular la lógica de Formik.
- `src/pages/`: Vistas principales de la aplicación diferenciadas por roles (Admin, Docente, Estudiante).
- `src/schemas/`: Esquemas de validación de Yup (extensión `.schema.ts`).
- `src/shared/services/`: Servicios de API utilizando **Redux Toolkit Query** (RTK Query).
- `src/store/`: Configuración de Redux Toolkit y slices de estado.
- `src/types/`: Definiciones de interfaces y tipos de TypeScript centralizados.

## Integración con Backend
El proyecto cliente interactúa con una API backend. Utiliza servicios en `src/shared/services/` con un `baseQuery.ts` que inyecta automáticamente el Bearer Token y maneja la renovación de tokens (refresh-token) de forma automática ante errores 401.

1 Es **obligatorio** consultar el archivo `..\DataFlowHub\DataFlowHub.Api\DataFlowHub.Api.http` del proyecto backend para obtener los endpoints disponibles.
- **Servicios**: Se deben crear servicios modulares (ej. `student.service.ts`, `academic.service.ts`) que exporten hooks generados por RTK Query.

## Reglas de Desarrollo
### Manejo de Formularios (Formik & Yup)
- **Hooks de Formulario**: Cada formulario debe tener un hook en `src/hooks/` que use `useFormik`.
- **Validación**: Los esquemas deben estar en `src/schemas/` y ser importados por los hooks de formulario.

### Tipado (TypeScript)
- Todas las respuestas de API y modelos de datos deben estar definidos en `src/types/entities.types.ts` o `src/types/auth.types.ts`.
- Evitar el uso de `any`.

### Estilos (Material UI & Tailwind CSS)
- **Material UI**: Priorizar para componentes complejos (tablas, diálogos, selectores).
- **Tailwind CSS**: Utilizar para el layout, espaciado y ajustes finos de diseño directamente en el JSX.

## Roles de Usuario
- **Administrador**: Control total del sistema.
- **Docente**: Gestión de sus cursos y estudiantes asignados.
- **Estudiante**: Acceso a cursos, calificaciones y perfil personal.
