import { useState } from 'react';
import { useCursos } from '../context/CursosContext.tsx';

export default function Cursos() {
  const { cursos, setCursos } = useCursos();

  const [nuevoCurso, setNuevoCurso] = useState({
    nombre: '',
    profesor: '',
    aula: '',
  });

  const agregarCurso = () => {
    if (!nuevoCurso.nombre) return;

    const curso = {
      id: Date.now(),
      ...nuevoCurso,
    };

    setCursos([...cursos, curso]);

    setNuevoCurso({ nombre: '', profesor: '', aula: '' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestión de Cursos</h1>

      {/* FORMULARIO */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="font-semibold mb-4">Agregar Curso</h2>

        <input
          type="text"
          placeholder="Nombre del curso"
          value={nuevoCurso.nombre}
          onChange={e => setNuevoCurso({ ...nuevoCurso, nombre: e.target.value })}
          className="border p-2 mb-2 w-full"
        />

        <input
          type="text"
          placeholder="Profesor"
          value={nuevoCurso.profesor}
          onChange={e => setNuevoCurso({ ...nuevoCurso, profesor: e.target.value })}
          className="border p-2 mb-2 w-full"
        />

        <input
          type="text"
          placeholder="Aula"
          value={nuevoCurso.aula}
          onChange={e => setNuevoCurso({ ...nuevoCurso, aula: e.target.value })}
          className="border p-2 mb-4 w-full"
        />

        <button onClick={agregarCurso} className="bg-blue-600 text-white px-4 py-2 rounded">
          Agregar Curso
        </button>
      </div>

      {/* LISTA DE CURSOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cursos.map(curso => (
          <div key={curso.id} className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold">{curso.nombre}</h2>
            <p>Profesor: {curso.profesor}</p>
            <p>Aula: {curso.aula}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
