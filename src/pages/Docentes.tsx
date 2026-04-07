import { useMemo, useState } from 'react';
import { useCursos } from '../context/CursosContext.tsx';
import { useDocentes } from '../context/DocentesContext.tsx';
import { setMustChangePassword } from '../store/slices/authSlice.ts';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { hasRole } from '../shared/utils/roles.ts';

type DocenteFormState = {
  nombre: string;
  email: string;
  clases: string[];
  username: string;
  temporaryPassword: string;
};

const emptyForm: DocenteFormState = {
  nombre: '',
  email: '',
  clases: [],
  username: '',
  temporaryPassword: '',
};

export default function Docentes() {
  const dispatch = useAppDispatch();
  const { cursos } = useCursos();
  const { docentes, addDocente, updateDocente, deleteDocente, getDocenteByEmail, changeDocentePassword } = useDocentes();
  const { email: userEmail, roles, username, mustChangePassword } = useAppSelector(state => state.authentication.userData);

  const isAdmin = hasRole(roles, 'admin');
  const isTeacher = hasRole(roles, 'teacher');

  const [form, setForm] = useState<DocenteFormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [latestCredentials, setLatestCredentials] = useState<{ username: string; temporaryPassword: string } | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');

  const availableClasses = useMemo(
    () =>
      Array.from(
        new Set([
          ...cursos.map(curso => curso.nombre),
          ...docentes.flatMap(docente => docente.clases),
          ...form.clases,
        ]),
      ),
    [cursos, docentes, form.clases],
  );

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
  };

  const normalizeEmail = (value: string) => value.trim().toLowerCase();

  const handleSubmit = () => {
    const nombre = form.nombre.trim();
    const email = normalizeEmail(form.email);
    const clases = form.clases;

    if (!nombre || !email) {
      setError('Nombre y correo son obligatorios.');
      return;
    }

    if (!form.username.trim() || !form.temporaryPassword.trim()) {
      setError('Usuario y contraseña temporal son obligatorios.');
      return;
    }

    if (clases.length === 0) {
      setError('Debes asignar al menos una clase.');
      return;
    }

    const duplicated = docentes.some(
      docente => normalizeEmail(docente.email) === email && (editingId === null || docente.id !== editingId),
    );

    if (duplicated) {
      setError('Ya existe un docente con ese correo.');
      return;
    }

    const duplicatedUsername = docentes.some(
      docente => docente.username.trim().toLowerCase() === form.username.trim().toLowerCase() && (editingId === null || docente.id !== editingId),
    );

    if (duplicatedUsername) {
      setError('Ese usuario ya está en uso.');
      return;
    }

    const payload = {
      nombre,
      email,
      clases,
      username: form.username.trim(),
      temporaryPassword: form.temporaryPassword.trim(),
    };

    if (editingId !== null) {
      updateDocente(editingId, payload);
      setLatestCredentials(null);
    } else {
      const credentials = addDocente(payload);
      setLatestCredentials(credentials);
    }

    resetForm();
  };

  const toggleClass = (className: string) => {
    setForm(prev => ({
      ...prev,
      clases: prev.clases.includes(className)
        ? prev.clases.filter(item => item !== className)
        : [...prev.clases, className],
    }));
  };

  const startEdit = (id: number) => {
    const docente = docentes.find(item => item.id === id);
    if (!docente) return;

    setForm({
      nombre: docente.nombre,
      email: docente.email,
      clases: docente.clases,
      username: docente.username,
      temporaryPassword: '',
    });
    setEditingId(id);
    setError('');
    setLatestCredentials(null);
  };

  if (!isAdmin && !isTeacher) {
    return <h1 className="text-2xl font-bold">No autorizado</h1>;
  }

  if (isTeacher && !isAdmin) {
    const docente = getDocenteByEmail(userEmail);

    const handleSavePassword = () => {
      if (newPassword.length < 6) {
        setProfileError('La nueva contrasena debe tener al menos 6 caracteres.');
        setProfileSuccess('');
        return;
      }

      if (newPassword !== confirmPassword) {
        setProfileError('Las contrasenas no coinciden.');
        setProfileSuccess('');
        return;
      }

      const updated = changeDocentePassword(userEmail, newPassword);

      if (!updated) {
        setProfileError('No se pudo actualizar la contrasena del docente.');
        setProfileSuccess('');
        return;
      }

      dispatch(setMustChangePassword(false));
      setProfileError('');
      setProfileSuccess('Contrasena actualizada correctamente.');
      setNewPassword('');
      setConfirmPassword('');
    };

    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Mi Perfil Docente</h1>

        <div className="bg-white p-6 rounded shadow mb-6">
          <p className="font-semibold mb-2">{docente?.nombre ?? 'Docente sin registro administrativo'}</p>
          <p className="text-gray-600 mb-1">Correo: {userEmail || 'Sin correo en sesion'}</p>
          <p className="text-gray-600 mb-1">Usuario: {username || 'Sin usuario'}</p>
          <p className="text-gray-600 mb-4">
            Estado de contrasena: {mustChangePassword ? 'Pendiente de cambio' : 'Actualizada'}
          </p>

          <h2 className="font-semibold mb-2">Clases asignadas</h2>
          {docente && docente.clases.length > 0 ? (
            <ul className="list-disc pl-6">
              {docente.clases.map(clase => (
                <li key={clase}>{clase}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tienes clases asignadas aún.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded shadow max-w-2xl">
          <h2 className="font-semibold mb-2">Cambiar contrasena</h2>
          <p className="text-gray-600 mb-4">
            {mustChangePassword
              ? 'Debes cambiar tu contrasena temporal para continuar.'
              : 'Puedes cambiar tu contrasena cuando lo necesites.'}
          </p>

          {profileError && <p className="text-red-500 mb-3">{profileError}</p>}
          {profileSuccess && <p className="text-green-600 mb-3">{profileSuccess}</p>}

          <input
            type="password"
            placeholder="Nueva contrasena"
            value={newPassword}
            onChange={event => setNewPassword(event.target.value)}
            className="border p-2 mb-3 w-full"
          />

          <input
            type="password"
            placeholder="Confirmar contrasena"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            className="border p-2 mb-4 w-full"
          />

          <button onClick={handleSavePassword} className="bg-blue-600 text-white px-4 py-2 rounded">
            Guardar nueva contrasena
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestión de Docentes</h1>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="font-semibold mb-4">{editingId !== null ? 'Editar Docente' : 'Agregar Docente'}</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {latestCredentials && (
          <div className="bg-amber-50 border border-amber-300 rounded p-3 mb-4">
            <p className="font-semibold text-amber-800">Credenciales generadas</p>
            <p className="text-sm">Usuario: {latestCredentials.username}</p>
            <p className="text-sm">Contraseña temporal: {latestCredentials.temporaryPassword}</p>
          </div>
        )}

        <input
          type="text"
          placeholder="Nombre del docente"
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
            {editingId !== null ? 'Actualizar Docente' : 'Agregar Docente'}
          </button>

          {editingId !== null && (
            <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docentes.map(docente => (
          <div key={docente.id} className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold mb-1">{docente.nombre}</h2>
            <p className="text-gray-600 mb-3">{docente.email}</p>

            <p className="text-sm mb-1">Usuario: {docente.username}</p>
            {docente.mustChangePassword && <p className="text-xs text-amber-700 mb-2">Pendiente cambio de contraseña</p>}

            <p className="font-medium">Clases:</p>
            {docente.clases.length > 0 ? (
              <ul className="list-disc pl-6 mb-4">
                {docente.clases.map(clase => (
                  <li key={`${docente.id}-${clase}`}>{clase}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mb-4">Sin clases asignadas</p>
            )}

            <div className="flex gap-2">
              <button onClick={() => startEdit(docente.id)} className="bg-amber-500 text-white px-3 py-1 rounded">
                Editar
              </button>
              <button
                onClick={() => {
                  if (editingId === docente.id) {
                    resetForm();
                  }
                  deleteDocente(docente.id);
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
