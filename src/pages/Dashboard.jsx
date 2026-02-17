import { useAuth } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import EstudianteDashboard from "./EstudianteDashboard";
import DocenteDashboard from "./DocenteDashboard";

export default function Dashboard() {
  const { role } = useAuth();

  if (role === "admin") return <AdminDashboard />;
  if (role === "estudiante") return <EstudianteDashboard />;
  if (role === "docente") return <DocenteDashboard />;

  return <h1>No autorizado</h1>;
}
