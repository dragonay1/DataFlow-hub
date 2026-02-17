import { useState } from "react";

export default function CursosDisponibles() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

  const cursos = [
    { id: 1, nombre: "Programación Web", profesor: "Ing. Pérez", aula: "A1" },
    { id: 2, nombre: "Base de Datos", profesor: "Ing. Gómez", aula: "B2" },
    { id: 3, nombre: "Redes", profesor: "Ing. Torres", aula: "C3" },
    { id: 4, nombre: "Inteligencia Artificial", profesor: "Ing. Ramos", aula: "D4" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Cursos Disponibles
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cursos.map((curso) => (
          <div
            key={curso.id}
            className={`bg-white p-6 rounded shadow ${
              cursoSeleccionado?.id === curso.id
                ? "border-2 border-green-500"
                : ""
            }`}
          >
            <h2 className="text-lg font-semibold">
              {curso.nombre}
            </h2>
            <p>Profesor: {curso.profesor}</p>
            <p>Aula: {curso.aula}</p>

            <button
              onClick={() => setCursoSeleccionado(curso)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Seleccionar Curso
            </button>
          </div>
        ))}
      </div>

      {cursoSeleccionado && (
        <div className="mt-6 bg-green-100 p-4 rounded shadow">
          Curso seleccionado: <strong>{cursoSeleccionado.nombre}</strong>
        </div>
      )}
    </div>
  );
}

