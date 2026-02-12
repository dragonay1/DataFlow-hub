import { Link } from "react-router-dom";
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaBook, 
  FaClipboardList, 
  FaChartBar 
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-10">DataFlow Hub</h1>

      <ul className="space-y-4">

        <li>
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:text-blue-400 transition"
          >
            <FaChartBar /> Dashboard
          </Link>
        </li>

        <li>
          <Link 
            to="/estudiantes" 
            className="flex items-center gap-3 hover:text-blue-400 transition"
          >
            <FaUserGraduate /> Estudiantes
          </Link>
        </li>

        <li>
          <Link 
            to="/docentes" 
            className="flex items-center gap-3 hover:text-blue-400 transition"
          >
            <FaChalkboardTeacher /> Docentes
          </Link>
        </li>

        <li>
          <Link 
            to="/cursos" 
            className="flex items-center gap-3 hover:text-blue-400 transition"
          >
            <FaBook /> Cursos
          </Link>
        </li>

        <li>
          <Link 
            to="/matriculas" 
            className="flex items-center gap-3 hover:text-blue-400 transition"
          >
            <FaClipboardList /> Matrículas
          </Link>
        </li>

      </ul>
    </div>
  );
}
