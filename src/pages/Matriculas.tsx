import { useAppSelector } from '../store/hooks.ts';
import { hasRole } from '../shared/utils/roles.ts';

function Matriculas() {
  const { roles, username, email } = useAppSelector(state => state.authentication.userData);
  const isStudent = hasRole(roles, 'student');

  const fechaActual = new Date().toLocaleDateString();

  const boletaEstudiante = {
    nombre: username || 'Estudiante',
    correo: email || 'Sin correo registrado',
    codigo: 'MAT-2026-014',
    anoCurso: '2do año',
    periodo: '2026-1',
    fechaMatricula: '06/04/2026',
    estado: 'Activo',
    carrera: 'Ingeniería en Sistemas',
    cursos: [
      'Desarrollo Web API',
      'Base de Datos II',
      'Arquitectura de Software',
      'Redes de Computadoras',
    ],
  };

  const matriculas = [
    {
      id: 1,
      estudiante: 'Ana López',
      anoCurso: '2do año',
      cursos: 'Desarrollo Web API, Base de Datos II, Arquitectura de Software',
      estado: 'Activo',
    },
    {
      id: 2,
      estudiante: 'Carlos Ramírez',
      anoCurso: '1er año',
      cursos: 'Programación I, Matemática Discreta, Introducción a la Web',
      estado: 'Inactivo',
    },
    {
      id: 3,
      estudiante: 'María Fernández',
      anoCurso: '3er año',
      cursos: 'Ingeniería de Software, Redes, Proyecto Final',
      estado: 'Activo',
    },
  ];

  if (isStudent) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto bg-white border shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b bg-slate-50 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Boleta de Matrícula</h1>
              <p className="text-sm text-slate-500">Resumen académico del estudiante</p>
            </div>

            <div className="text-sm text-slate-600 sm:text-right">
              <p>
                <strong>Código:</strong> {boletaEstudiante.codigo}
              </p>
              <p>
                <strong>Fecha:</strong> {fechaActual}
              </p>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Datos personales</p>
                <div className="mt-3 space-y-2 text-slate-700">
                  <p>
                    <span className="font-semibold">Estudiante:</span> {boletaEstudiante.nombre}
                  </p>
                  <p>
                    <span className="font-semibold">Correo:</span> {boletaEstudiante.correo}
                  </p>
                  <p>
                    <span className="font-semibold">Carrera:</span> {boletaEstudiante.carrera}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Información académica</p>
                <div className="mt-3 space-y-2 text-slate-700">
                  <p>
                    <span className="font-semibold">Año que cursa:</span> {boletaEstudiante.anoCurso}
                  </p>
                  <p>
                    <span className="font-semibold">Periodo:</span> {boletaEstudiante.periodo}
                  </p>
                  <p>
                    <span className="font-semibold">Fecha de matrícula:</span> {boletaEstudiante.fechaMatricula}
                  </p>
                  <p>
                    <span className="font-semibold">Estado:</span>{' '}
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        boletaEstudiante.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {boletaEstudiante.estado}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cursos que lleva</p>
              <ul className="mt-4 space-y-3">
                {boletaEstudiante.cursos.map(curso => (
                  <li key={curso} className="flex items-start gap-3 rounded-md bg-white px-4 py-3 shadow-sm border">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-slate-700">{curso}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t px-6 py-4 text-sm text-slate-500 bg-white">
            Documento generado por el Sistema Académico.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Matrículas</h1>
        <p className="text-sm text-gray-500 mt-1">Listado de estudiantes, año que cursan, cursos inscritos y estado actual.</p>
      </div>

      <div className="bg-white shadow-md rounded-lg border overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">Administración de matrículas</h2>
            <p className="text-sm text-gray-500">Actualizado al {fechaActual}</p>
          </div>
          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{matriculas.length} registros</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Estudiante</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Año que cursa</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Cursos que lleva</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matriculas.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.estudiante}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.anoCurso}</td>
                  <td className="px-6 py-4 text-gray-700">{item.cursos}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        item.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Matriculas;
