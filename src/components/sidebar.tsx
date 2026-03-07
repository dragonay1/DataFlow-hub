import { Link } from 'react-router-dom';

import { FaTachometerAlt, FaUsers, FaChalkboardTeacher, FaBook, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { setIsAuthenticated } from '../store/slices/authSlice.ts';

function Sidebar() {
  const { roles } = useAppSelector(state => state.authentication.userData);
  const isStudent = roles.includes('Student');
  const isAdmin = roles.includes('Admin');
  const isTeacher = roles.includes('Teacher');
  const dispatch = useAppDispatch();

  return (
    <div className="w-64 h-screen bg-blue-800 text-white p-5 flex flex-col">
      <h2 className="text-xl font-bold mb-6 text-center">DataFlow Hub</h2>

      <p className="mb-4 text-sm text-gray-400">
        Rol: <span className="font-semibold text-white">{roles?.[0]}</span>
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
