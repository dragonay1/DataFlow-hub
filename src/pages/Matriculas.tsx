import {useAppSelector} from "../store/hooks.ts";

function Matriculas() {
  const { roles } = useAppSelector(state => state.authentication.userData)
  const isStudent = roles.includes("Student");

  const fechaActual = new Date().toLocaleDateString();

  const matriculas = [
    {
      id: 1,
      codigo: "MAT-2026-001",
      curso: "Desarrollo Web API",
      profesor: "Ing. Carlos Mendoza",
      aula: "Laboratorio 3",

    },
    {
      id: 2,
      codigo: "MAT-2026-001",
      curso: "Inteligencia Artificil",
      profesor: "Ing. Moises Castillo",
      aula: "Laboratorio 1",
      
    },
  ];

  if (isStudent) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-500">
          
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Boleta de Matrícula
      </h1>

      {matriculas.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow-md rounded-lg border p-6 max-w-2xl"
        >
          {/* Encabezado */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                alt="Logo"
                className="w-10 h-10"
              />
              <div>
                <h2 className="font-bold">
                  Universidad DataFlow
                </h2>
                <p className="text-sm text-gray-500">
                  Boleta Oficial
                </p>
              </div>
            </div>

            <div className="text-sm text-right">
              <p><strong>Código:</strong> {item.codigo}</p>
              <p><strong>Fecha:</strong> {fechaActual}</p>
            </div>
          </div>

          {/* Información */}
          <div className="space-y-3">
            <p>
              <span className="font-semibold">Curso:</span>{" "}
              {item.curso}
            </p>

            <p>
              <span className="font-semibold">Profesor:</span>{" "}
              {item.profesor}
            </p>

            <p>
              <span className="font-semibold">Aula:</span>{" "}
              {item.aula}
            </p>
          </div>

          {/* Pie */}
          <div className="border-t mt-6 pt-3 text-sm text-gray-500">
            Documento generado por el Sistema Académico.
          </div>
        </div>
      ))}
    </div>
  );
}

export default Matriculas;
