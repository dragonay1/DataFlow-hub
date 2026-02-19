import AdminDashboard from "./AdminDashboard.tsx";
import EstudianteDashboard from "./EstudianteDashboard.tsx";
import {useAppSelector} from "../store/hooks.ts";
import DocenteDashboard from "./DocenteDashboard.tsx";

export default function Dashboard() {
  const { roles } = useAppSelector(state => state.authentication.userData)
  const isStudent = roles.includes("Student");
  const isAdmin = roles.includes("Admin");
  const isTeacher = roles.includes("Teacher");

  if (isAdmin) return <AdminDashboard />;
  if (isStudent) return <EstudianteDashboard />;
  if (isTeacher) return <DocenteDashboard />;

  return <h1>No autorizado</h1>;
}
