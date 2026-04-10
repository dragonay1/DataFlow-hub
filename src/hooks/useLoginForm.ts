import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated, setUserData } from '../store/slices/authSlice.ts';
import { authenticateLocalUser } from '../shared/mocks/auth.mock.ts';
import { useEstudiantes } from '../context/EstudiantesContext.tsx';
import { useDocentes } from '../context/DocentesContext.tsx';
import { loginSchema } from '../schemas/login.schema.ts';
import type { LoginValues } from '../types/auth.types.ts';

export const useLoginForm = () => {
  const dispatch = useDispatch();
  const { authenticateEstudiante } = useEstudiantes();
  const { authenticateDocente } = useDocentes();
  const [error, setError] = useState('');

  const initialValues: LoginValues = useMemo(
    () => ({
      username: '',
      password: '',
    }),
    [],
  );

  const formik = useFormik<LoginValues>({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: async values => {
      const user =
        authenticateEstudiante(values.username, values.password) ??
        authenticateDocente(values.username, values.password) ??
        authenticateLocalUser(values.username, values.password);

      if (!user) {
        setError('Credenciales invalidas. Usa admin/123 o las credenciales asignadas por administración.');
        dispatch(setIsAuthenticated(false));
        return;
      }

      dispatch(setUserData(user));
      dispatch(setIsAuthenticated(true));
      setError('');
    },
  });

  return {
    formik,
    error,
    setError,
  };
};
