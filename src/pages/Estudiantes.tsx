import { useMemo, useState } from 'react';
import { useCursos } from '../context/CursosContext.tsx';
import { useEstudiantes } from '../context/EstudiantesContext.tsx';
import { useAppSelector } from '../store/hooks.ts';
import { hasRole } from '../shared/utils/roles.ts';

type EstudianteForm = {
  nombre: string;
  email: string;
  clases: string[];
  username: string;
  temporaryPassword: string;
};

const emptyForm: EstudianteForm = {
  nombre: '',
  email: '',
  clases: [],
  username: '',
  temporaryPassword: '',
};

export default function Estudiantes() {
  const { cursos } = useCursos();
  const { estudiantes, addEstudiante, updateEstudiante, deleteEstudiante } = useEstudiantes();
  const roles = useAppSelector(state => state.authentication.userData.roles);

  const isAdmin = hasRole(roles, 'admin');

  const [form, setForm] = useState<EstudianteForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [latestCredentials, setLatestCredentials] = useState<{ username: string; temporaryPassword: string } | null>(null);

  const availableClasses = useMemo(
    () =>
      Array.from(
        new Set([
          ...cursos.map(course => course.nombre),
          ...estudiantes.flatMap(student => student.clases),
          ...form.clases,
        ]),
      ),
    [cursos, estudiantes, form.clases],
  );

  const normalizeEmail = (value: string) => value.trim().toLowerCase();

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
  };

  const toggleClass = (className: string) => {
    setForm(prev => ({
      ...prev,
      clases: prev.clases.includes(className)
        ? prev.clases.filter(current => current !== className)
        : [...prev.clases, className],
    }));
  };

  const handleSubmit = () => {
    const nombre = form.nombre.trim();
    const email = normalizeEmail(form.email);

    if (!nombre || !email) {
      setError('Nombre y correo son obligatorios.');
      return;
    }

    if (!form.username.trim() || !form.temporaryPassword.trim()) {
      setError('Usuario y contraseña temporal son obligatorios.');
      return;
    }

    if (form.clases.length === 0) {
      setError('Debes asignar al menos una clase.');
      return;
    }

    const duplicatedEmail = estudiantes.some(
      student => normalizeEmail(student.email) === email && (editingId === null || student.id !== editingId),
    );

    if (duplicatedEmail) {
      setError('Ya existe un estudiante con ese correo.');
      return;
    }

    const duplicatedUsername = estudiantes.some(
      student => student.username.trim().toLowerCase() === form.username.trim().toLowerCase() && (editingId === null || student.id !== editingId),
    );

    if (duplicatedUsername) {
      setError('Ese usuario ya está en uso.');
      return;
    }

    if (editingId !== null) {
      updateEstudiante(editingId, {
        nombre,
        email,
        clases: form.clases,
        username: form.username.trim(),
        temporaryPassword: form.temporaryPassword.trim(),
      });
      setLatestCredentials(null);
    } else {
      const credentials = addEstudiante({
        nombre,
        email,
        clases: form.clases,
        username: form.username.trim(),
        temporaryPassword: form.temporaryPassword.trim(),
      });
      setLatestCredentials(credentials);
    }

    resetForm();
  };

  const startEdit = (id: number) => {
    const student = estudiantes.find(item => item.id === id);
    if (!student) return;

    setForm({
      nombre: student.nombre,
      email: student.email,
      clases: student.clases,
      username: student.username,
      temporaryPassword: '',
    });
    setEditingId(id);
    setError('');
    setLatestCredentials(null);
  };

  if (!isAdmin) {
    return <h1 className="text-2xl font-bold">No autorizado</h1>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestión de Estudiantes</h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="font-semibold mb-4">{editingId !== null ? 'Editar Estudiante' : 'Agregar Estudiante'}</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {latestCredentials && (
          <div className="bg-amber-50 border border-amber-300 rounded p-3 mb-4">
            <p className="font-semibold text-amber-800">Credenciales generadas</p>
            <p className="text-sm">Usuario: {latestCredentials.username}</p>
            <p className="text-sm">Contraseña temporal: {latestCredentials.temporaryPassword}</p>
            <p className="text-xs text-amber-700 mt-1">
              Al ingresar por primera vez, el estudiante deberá cambiar esta contraseña.
            </p>
          </div>
        )}

        <input
          type="text"
          placeholder="Nombre del estudiante"
          value={form.nombre}
          onChange={event => setForm(prev => ({ ...prev, nombre: event.target.value }))}
          className="border p-2 mb-2 w-full"
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={event => setForm(prev => ({ ...prev, email: event.target.value }))}
          className="border p-2 mb-4 w-full"
        />

        <input
          type="text"
          placeholder="Usuario"
          value={form.username}
          onChange={event => setForm(prev => ({ ...prev, username: event.target.value }))}
          className="border p-2 mb-2 w-full"
        />

        <input
          type="text"
          placeholder={editingId !== null ? 'Contraseña temporal (escribe una nueva para actualizar)' : 'Contraseña temporal'}
          value={form.temporaryPassword}
          onChange={event => setForm(prev => ({ ...prev, temporaryPassword: event.target.value }))}
          className="border p-2 mb-4 w-full"
        />

        <p className="font-medium mb-2">Asignar clases</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          {availableClasses.map(className => (
            <label key={className} className="flex items-center gap-2 border rounded p-2">
              <input
                type="checkbox"
                checked={form.clases.includes(className)}
                onChange={() => toggleClass(className)}
              />
              <span>{className}</span>
            </label>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingId !== null ? 'Actualizar Estudiante' : 'Agregar Estudiante'}
          </button>

          {editingId !== null && (
            <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {estudiantes.map(student => (
          <div key={student.id} className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold mb-1">{student.nombre}</h2>
            <p className="text-gray-600 mb-2">{student.email}</p>

            <p className="text-sm mb-1">Usuario: {student.username}</p>
            {student.mustChangePassword && (
              <p className="text-xs text-amber-700 mb-2">Pendiente cambio de contraseña</p>
            )}

            <p className="font-medium">Clases:</p>
            {student.clases.length > 0 ? (
              <ul className="list-disc pl-6 mb-4">
                {student.clases.map(clase => (
                  <li key={`${student.id}-${clase}`}>{clase}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mb-4">Sin clases asignadas</p>
            )}

            <div className="flex gap-2">
              <button onClick={() => startEdit(student.id)} className="bg-amber-500 text-white px-3 py-1 rounded">
                Editar
              </button>
              <button
                onClick={() => {
                  if (editingId === student.id) {
                    resetForm();
                  }
                  deleteEstudiante(student.id);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
