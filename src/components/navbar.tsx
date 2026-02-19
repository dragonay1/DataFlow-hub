import {useAppSelector} from "../store/hooks.ts";

export default function Navbar() {
    const { roles } = useAppSelector(state => state.authentication.userData)
    const isStudent = roles.includes("Student");
    const isAdmin = roles.includes("Admin");
    const isTeacher = roles.includes("Teacher");

  const getTitle = () => {
    if (isAdmin) return "Panel Administrativo";
    if (isTeacher) return "Panel Docente";
    if (isStudent) return "Panel Estudiantil";
    return "Sistema Académico";
  };

  return (
    <div className="bg-purple-800 shadow p-4 flex justify-between items-center">
      <h1 className="text-white font-semibold">
        {getTitle()}
      </h1>

      <span className="capitalize text-white font-medium">
        {roles?.[0]}
      </span>
    </div>
  );
}
