import { useAppSelector } from '../store/hooks.ts';
import { getPrimaryRoleLabel, hasRole } from '../shared/utils/roles.ts';

export default function Navbar() {
  const { roles } = useAppSelector(state => state.authentication.userData);
  const isStudent = hasRole(roles, 'student');
  const isAdmin = hasRole(roles, 'admin');
  const isTeacher = hasRole(roles, 'teacher');

  const getTitle = () => {
    if (isAdmin) return 'Panel Administrativo';
    if (isTeacher) return 'Panel Docente';
    if (isStudent) return 'Panel Estudiantil';
    return 'Sistema Académico';
  };

  return (
    <div className="bg-purple-800 shadow p-4 flex justify-between items-center">
      <h1 className="text-white font-semibold">{getTitle()}</h1>

      <span className="capitalize text-white font-medium">{getPrimaryRoleLabel(roles)}</span>
    </div>
  );
}
