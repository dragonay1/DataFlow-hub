import { useDocentes } from '../context/DocentesContext.tsx';
import { useCursos } from '../context/CursosContext.tsx';
import { useAppSelector } from '../store/hooks.ts';

const horarioPorCurso: Record<string, string> = {
  Programacion: 'Lunes y Miercoles 08:00 - 10:00',
  'Base de Datos': 'Martes y Jueves 10:00 - 12:00',
  Redes: 'Viernes 13:00 - 16:00',
  'API Web': 'Sabado 09:00 - 12:00',
};

const normalizeCourseName = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export default function DocenteDashboard() {
  const { getDocenteByEmail } = useDocentes();
  const { cursos } = useCursos();
  const email = useAppSelector(state => state.authentication.userData.email);

  const docente = getDocenteByEmail(email);
  const fechaActual = new Date().toLocaleDateString();

  const boletasCursos = (docente?.clases ?? []).map((clase, index) => {
    const cursoAsociado = cursos.find(curso => normalizeCourseName(curso.nombre) === normalizeCourseName(clase));
    const cursoNormalizado = normalizeCourseName(clase);

    return {
      id: `${clase}-${index}`,
      codigo: `DOC-${new Date().getFullYear()}-${String(index + 1).padStart(3, '0')}`,
      curso: clase,
      aula: cursoAsociado?.aula ?? 'Por asignar',
      horario: horarioPorCurso[cursoNormalizado] ?? 'Horario por definir',
    };
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Panel del Docente</h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        <p className="mb-1">Bienvenido docente</p>
        <p className="text-gray-600">Aquí podrás ver tus cursos asignados.</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4">Cursos asignados</h2>

        {boletasCursos.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {boletasCursos.map(item => (
              <div key={item.id} className="border rounded-lg shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b bg-slate-50 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">Boleta de Curso a Impartir</h3>
                    <p className="text-xs text-slate-500">Planificacion academica docente</p>
                  </div>
                  <div className="text-xs text-right text-slate-600">
                    <p>
                      <strong>Codigo:</strong> {item.codigo}
                    </p>
                    <p>
                      <strong>Fecha:</strong> {fechaActual}
                    </p>
                  </div>
                </div>

                <div className="p-5 space-y-3 text-slate-700">
                  <p>
                    <span className="font-semibold">Curso a impartir:</span> {item.curso}
                  </p>
                  <p>
                    <span className="font-semibold">Aula donde se impartira:</span> {item.aula}
                  </p>
                  <p>
                    <span className="font-semibold">Horario:</span> {item.horario}
                  </p>
                </div>

                <div className="px-5 py-3 border-t text-xs text-slate-500 bg-white">Documento generado por el Sistema Academico.</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tienes clases asignadas todavía.</p>
        )}
      </div>
    </div>
  );
}
