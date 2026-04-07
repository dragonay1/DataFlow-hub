import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../store/hooks.ts';
import { hasRole } from '../shared/utils/roles.ts';
import { useDocentes } from '../context/DocentesContext.tsx';
import { useEstudiantes } from '../context/EstudiantesContext.tsx';

type ScoreRecord = {
  tareas: string;
  examenes: string;
};

type StudentCourse = {
  key: string;
  estudianteId: number;
  estudiante: string;
  correo: string;
  curso: string;
};

const parseGrade = (value: string) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : NaN;
};

const gradeStatus = (value: number) => {
  if (Number.isNaN(value)) return 'Pendiente';
  return value >= 60 ? 'Aprobado' : 'Reprobado';
};

export default function DocenteEstudiantes() {
  const { roles, email } = useAppSelector(state => state.authentication.userData);
  const isTeacher = hasRole(roles, 'teacher');
  const { getDocenteByEmail } = useDocentes();
  const { estudiantes } = useEstudiantes();

  const docente = getDocenteByEmail(email);
  const clasesDocente = docente?.clases ?? [];

  const estudiantesAsignados = useMemo<StudentCourse[]>(() => {
    if (clasesDocente.length === 0) return [];

    return estudiantes.flatMap(estudiante => {
      const cursosCoincidentes = estudiante.clases.filter(clase => clasesDocente.includes(clase));

      return cursosCoincidentes.map(curso => ({
        key: `${estudiante.id}-${curso}`,
        estudianteId: estudiante.id,
        estudiante: estudiante.nombre,
        correo: estudiante.email,
        curso,
      }));
    });
  }, [clasesDocente, estudiantes]);

  const [scores, setScores] = useState<Record<string, ScoreRecord>>({});
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    if (clasesDocente.length === 0) {
      setSelectedCourse('');
      return;
    }

    if (!selectedCourse || !clasesDocente.includes(selectedCourse)) {
      setSelectedCourse(clasesDocente[0]);
    }
  }, [clasesDocente, selectedCourse]);

  const estudiantesPorCurso = useMemo(() => {
    if (!selectedCourse) return [];
    return estudiantesAsignados.filter(item => item.curso === selectedCourse);
  }, [estudiantesAsignados, selectedCourse]);

  const handleScoreChange = (key: string, field: keyof ScoreRecord, value: string) => {
    if (value !== '' && !/^\d{0,3}(\.\d{0,2})?$/.test(value)) return;

    const parsed = parseGrade(value);
    const safeValue = value === '' || (parsed >= 0 && parsed <= 100) ? value : scores[key]?.[field] ?? '';

    setScores(prev => ({
      ...prev,
      [key]: {
        tareas: prev[key]?.tareas ?? '',
        examenes: prev[key]?.examenes ?? '',
        [field]: safeValue,
      },
    }));
  };

  if (!isTeacher) {
    return <h1 className="text-2xl font-bold">No autorizado</h1>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Estudiantes Asignados</h1>
        <p className="text-gray-600 mt-1">Registra puntuaciones de tareas y examenes para los cursos que impartes.</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-2">Cursos que impartira el docente</h2>
        {clasesDocente.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {clasesDocente.map(clase => (
              <button
                key={clase}
                type="button"
                onClick={() => setSelectedCourse(clase)}
                className={`inline-flex px-3 py-1 rounded-full text-sm border transition-colors ${
                  selectedCourse === clase
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {clase}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tienes cursos asignados.</p>
        )}
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold">
            Lista de estudiantes por curso{selectedCourse ? `: ${selectedCourse}` : ''}
          </h2>
        </div>

        {selectedCourse && estudiantesPorCurso.length === 0 ? (
          <p className="p-6 text-gray-500">No hay estudiantes asignados en este curso.</p>
        ) : !selectedCourse ? (
          <p className="p-6 text-gray-500">Selecciona un curso para ver los estudiantes asignados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Estudiante</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Correo</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Curso</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tareas (0-100)</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Examenes (0-100)</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Promedio</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {estudiantesPorCurso.map(item => {
                  const itemScores = scores[item.key] ?? { tareas: '', examenes: '' };
                  const tareas = parseGrade(itemScores.tareas);
                  const examenes = parseGrade(itemScores.examenes);
                  const promedio = Number.isNaN(tareas) || Number.isNaN(examenes) ? NaN : tareas * 0.4 + examenes * 0.6;
                  const estado = gradeStatus(promedio);

                  return (
                    <tr key={item.key} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{item.estudiante}</td>
                      <td className="px-4 py-3 text-gray-600">{item.correo}</td>
                      <td className="px-4 py-3 text-gray-700">{item.curso}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={itemScores.tareas}
                          onChange={event => handleScoreChange(item.key, 'tareas', event.target.value)}
                          className="w-28 border rounded px-2 py-1"
                          placeholder="0-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={itemScores.examenes}
                          onChange={event => handleScoreChange(item.key, 'examenes', event.target.value)}
                          className="w-28 border rounded px-2 py-1"
                          placeholder="0-100"
                        />
                      </td>
                      <td className="px-4 py-3 text-gray-700">{Number.isNaN(promedio) ? '-' : promedio.toFixed(1)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                            estado === 'Aprobado'
                              ? 'bg-green-100 text-green-700'
                              : estado === 'Reprobado'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {estado}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
