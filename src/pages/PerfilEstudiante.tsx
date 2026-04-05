import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { setMustChangePassword } from '../store/slices/authSlice.ts';
import { useEstudiantes } from '../context/EstudiantesContext.tsx';
import { hasRole } from '../shared/utils/roles.ts';

export default function PerfilEstudiante() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { changeStudentPassword } = useEstudiantes();
  const { email, username, roles, mustChangePassword } = useAppSelector(state => state.authentication.userData);

  const isStudent = hasRole(roles, 'student');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = () => {
    if (newPassword.length < 6) {
      setError('La nueva contrasena debe tener al menos 6 caracteres.');
      setSuccess('');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contrasenas no coinciden.');
      setSuccess('');
      return;
    }

    const updated = changeStudentPassword(email, newPassword);

    if (!updated) {
      setError('No se pudo actualizar la contrasena del estudiante.');
      setSuccess('');
      return;
    }

    dispatch(setMustChangePassword(false));
    setError('');
    setSuccess('Contrasena actualizada correctamente.');
    setNewPassword('');
    setConfirmPassword('');

    if (mustChangePassword) {
      navigate('/');
    }
  };

  if (!isStudent) {
    return <h1 className="text-2xl font-bold">No autorizado</h1>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Perfil del Estudiante</h1>

      <div className="bg-white p-6 rounded shadow mb-6 max-w-2xl">
        <p className="font-semibold mb-1">Usuario: {username || 'Sin usuario'}</p>
        <p className="text-gray-600">Correo: {email || 'Sin correo'}</p>
      </div>

      <div className="bg-white p-6 rounded shadow max-w-2xl">
        <h2 className="font-semibold mb-2">Cambiar contrasena</h2>
        <p className="text-gray-600 mb-4">
          {mustChangePassword
            ? 'Debes cambiar tu contrasena temporal para continuar.'
            : 'Puedes cambiar tu contrasena cuando lo necesites.'}
        </p>

        {error && <p className="text-red-500 mb-3">{error}</p>}
        {success && <p className="text-green-600 mb-3">{success}</p>}

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

        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar nueva contrasena
        </button>
      </div>
    </div>
  );
}
