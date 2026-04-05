import { Link } from 'react-router-dom';

import { FaTachometerAlt, FaUsers, FaChalkboardTeacher, FaBook, FaClipboardList, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { setIsAuthenticated } from '../store/slices/authSlice.ts';
import { getPrimaryRoleLabel, hasRole } from '../shared/utils/roles.ts';

function Sidebar() {
  const { roles } = useAppSelector(state => state.authentication.userData);
  const isStudent = hasRole(roles, 'student');
  const isAdmin = hasRole(roles, 'admin');
  const isTeacher = hasRole(roles, 'teacher');
  const dispatch = useAppDispatch();

  return (
    <div className="w-64 h-screen bg-blue-800 text-white p-5 flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-center">DataFlow Hub</h2>

      <p className="mb-4 text-sm text-gray-400">
        Rol: <span className="font-semibold text-white">{getPrimaryRoleLabel(roles)}</span>
      </p>

      {/* ADMIN */}
      {isAdmin && (
        <>
          <Link to="/" className="flex items-center gap-2 mb-3 hover:text-blue-300">
            <FaTachometerAlt /> Dashboard
          </Link>

          <Link to="/docentes" className="flex items-center gap-2 mb-3 hover:text-blue-300">
            <FaChalkboardTeacher /> Docentes
          </Link>

          <Link to="/estudiantes" className="flex items-center gap-2 mb-3 hover:text-blue-300">
            <FaUsers /> Estudiantes
          </Link>

          <Link to="/cursos" className="flex items-center gap-2 mb-3 hover:text-blue-300">
            <FaBook /> Cursos
          </Link>

          <Link to="/matriculas" className="flex items-center gap-2 mb-3 hover:text-blue-300">
            <FaClipboardList /> Matrículas
          </Link>
        </>
      )}

      {/* DOCENTE */}
      {isTeacher && (
        <>
          <Link to="/" className="flex items-center gap-2 mb-3 hover:text-blue-300">
            <FaTachometerAlt /> Dashboard
          </Link>

          <Link to="/docentes" className="flex items-center gap-2 mb-3 hover:text-blue-300">
            <FaChalkboardTeacher /> Mi Perfil
          </Link>

          <Link to="/cursos" className="flex items-center gap-2 mb-3 hover:text-blue-300">
            <FaBook /> Cursos
          </Link>
        </>
      )}

      {/* ESTUDIANTE */}
      {isStudent && (
        <>
          <Link to="/" className="flex items-center gap-2 mb-3 hover:text-blue-300">
            <FaTachometerAlt /> Dashboard
          </Link>

          <Link to="/perfil-estudiante" className="flex items-center gap-2 mb-3 hover:text-blue-300">
            <FaUser /> Mi Perfil
          </Link>

          <Link to="/cursos-disponibles" className="flex items-center gap-2 mb-3 hover:text-blue-300">
            <FaBook /> Cursos Disponibles
          </Link>

          <Link to="/matriculas" className="flex items-center gap-2 mb-3 hover:text-blue-300">
            <FaClipboardList /> Mis Matrículas
          </Link>
        </>
      )}

      <button
        onClick={() => {
          dispatch(setIsAuthenticated(false));
        }}
        className="flex items-center justify-center gap-2 mt-auto bg-red-500 hover:bg-red-600 p-2 rounded"
      >
        <FaSignOutAlt /> Cerrar Sesión
      </button>
    </div>
  );
}

export default Sidebar;
