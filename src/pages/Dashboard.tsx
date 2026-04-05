import AdminDashboard from './AdminDashboard.tsx';
import EstudianteDashboard from './EstudianteDashboard.tsx';
import { useAppSelector } from '../store/hooks.ts';
import DocenteDashboard from './DocenteDashboard.tsx';
import { hasRole } from '../shared/utils/roles.ts';

export default function Dashboard() {
  const { roles } = useAppSelector(state => state.authentication.userData);
  const isStudent = hasRole(roles, 'student');
  const isAdmin = hasRole(roles, 'admin');
  const isTeacher = hasRole(roles, 'teacher');

  if (isAdmin) return <AdminDashboard />;
  if (isStudent) return <EstudianteDashboard />;
  if (isTeacher) return <DocenteDashboard />;

  return <h1>No autorizado</h1>;
}
