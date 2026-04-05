import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { setMustChangePassword } from '../store/slices/authSlice.ts';
import { useEstudiantes } from '../context/EstudiantesContext.tsx';

export default function CambiarContrasena() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { changeStudentPassword } = useEstudiantes();
  const email = useAppSelector(state => state.authentication.userData.email);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const updated = changeStudentPassword(email, newPassword);

    if (!updated) {
      setError('No se pudo actualizar la contraseña del estudiante.');
      return;
    }

    dispatch(setMustChangePassword(false));
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Cambio Obligatorio de Contraseña</h1>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <p className="text-gray-700 mb-4">Debes cambiar tu contraseña temporal para continuar.</p>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={event => setNewPassword(event.target.value)}
          className="border p-2 mb-3 w-full"
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
          className="border p-2 mb-4 w-full"
        />

        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar nueva contraseña
        </button>
      </div>
    </div>
  );
}