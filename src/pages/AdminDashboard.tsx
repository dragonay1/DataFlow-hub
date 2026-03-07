import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const dataCursos = [
    { name: 'Programación', estudiantes: 40 },
    { name: 'Base de Datos', estudiantes: 25 },
    { name: 'Redes', estudiantes: 30 },
    { name: 'API Web', estudiantes: 20 },
  ];

  const dataMatriculas = [
    { name: 'Enero', value: 30 },
    { name: 'Febrero', value: 45 },
    { name: 'Marzo', value: 60 },
    { name: 'Abril', value: 50 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Administrativo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfica de Barras */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Estudiantes por Curso</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataCursos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="estudiantes" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica Circular */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Matrículas por Mes</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={dataMatriculas} dataKey="value" nameKey="name" outerRadius={100} label>
                {dataMatriculas.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
