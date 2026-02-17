import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { role } = useAuth();

  const getTitle = () => {
    if (role === "admin") return "Panel Administrativo";
    if (role === "docente") return "Panel Docente";
    if (role === "estudiante") return "Panel Estudiantil";
    return "Sistema Académico";
  };

  return (
    <div className="bg-purple-800 shadow p-4 flex justify-between items-center">
      <h1 className="text-white font-semibold">
        {getTitle()}
      </h1>

      <span className="capitalize text-white font-medium">
        {role}
      </span>
    </div>
  );
}
