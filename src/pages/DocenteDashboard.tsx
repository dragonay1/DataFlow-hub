import { useDocentes } from '../context/DocentesContext.tsx';
import { useAppSelector } from '../store/hooks.ts';

export default function DocenteDashboard() {
  const { getDocenteByEmail } = useDocentes();
  const email = useAppSelector(state => state.authentication.userData.email);

  const docente = getDocenteByEmail(email);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Panel del Docente</h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        <p className="mb-1">Bienvenido docente</p>
        <p className="text-gray-600">Aquí podrás ver tus cursos asignados.</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-3">Mis clases</h2>

        {docente && docente.clases.length > 0 ? (
          <ul className="list-disc pl-6">
            {docente.clases.map(clase => (
              <li key={clase}>{clase}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tienes clases asignadas todavía.</p>
        )}
      </div>
    </div>
  );
}
