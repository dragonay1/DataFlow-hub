import {FaBook, FaClipboardList} from "react-icons/fa";

function Dashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                Panel del Estudiante
            </h1>

            <div className="bg-white p-6 rounded shadow">
                <p>Bienvenido estudiante 👨‍🎓</p>
                <p>Aquí podrás ver tus cursos y matrículas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card icon={<FaBook/>} title="Cursos Matriculados" value="2"/>
                <Card icon={<FaClipboardList/>} title="Estado" value="Activo"/>
            </div>
        </div>
    );
}

function Card({icon, title, value}) {
    return (
        <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4 border">
            <div className="text-blue-600 text-3xl">
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-xl font-bold">{value}</p>
            </div>
        </div>
    );
}

export default Dashboard;
