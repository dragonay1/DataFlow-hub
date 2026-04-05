import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  clases: string[];
  username: string;
  password: string;
  mustChangePassword: boolean;
}

type NewEstudianteInput = {
  nombre: string;
  email: string;
  clases: string[];
  username: string;
  temporaryPassword: string;
};

type AuthenticatedStudent = {
  userId: string;
  email: string;
  token: string;
  refreshToken: string;
  roles: string[];
  username: string;
  mustChangePassword: boolean;
};

interface EstudiantesContextValue {
  estudiantes: Estudiante[];
  addEstudiante: (input: NewEstudianteInput) => { username: string; temporaryPassword: string };
  updateEstudiante: (id: number, input: NewEstudianteInput) => void;
  deleteEstudiante: (id: number) => void;
  regenerateEstudiantePassword: (id: number) => { username: string; temporaryPassword: string } | null;
  authenticateEstudiante: (username: string, password: string) => AuthenticatedStudent | null;
  changeStudentPassword: (email: string, newPassword: string) => boolean;
}

const EstudiantesContext = createContext<EstudiantesContextValue | undefined>(undefined);

const normalize = (value: string) => value.trim().toLowerCase();

const generateTemporaryPassword = () => {
  const partA = Math.random().toString(36).slice(2, 6).toUpperCase();
  const partB = Math.random().toString(36).slice(2, 6);
  return `${partA}${partB}`;
};

const initialStudents: Estudiante[] = [
  {
    id: 1,
    nombre: 'Estudiante Demo',
    email: 'estudiante@local.dev',
    clases: ['Programación'],
    username: 'estudiante',
    password: '123',
    mustChangePassword: false,
  },
];

export function EstudiantesProvider({ children }: { children: ReactNode }) {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>(initialStudents);

  const addEstudiante = (input: NewEstudianteInput) => {
    const username = input.username.trim();
    const temporaryPassword = input.temporaryPassword.trim();
    setEstudiantes(prev => {
      return [
        ...prev,
        {
          id: Date.now(),
          nombre: input.nombre.trim(),
          email: normalize(input.email),
          clases: input.clases,
          username,
          password: temporaryPassword,
          mustChangePassword: true,
        },
      ];
    });

    return {
      username,
      temporaryPassword,
    };
  };

  const updateEstudiante = (id: number, input: NewEstudianteInput) => {
    setEstudiantes(prev =>
      prev.map(student =>
        student.id === id
          ? {
              ...student,
              nombre: input.nombre.trim(),
              email: normalize(input.email),
              clases: input.clases,
              username: input.username.trim(),
              password: input.temporaryPassword.trim(),
              mustChangePassword: true,
            }
          : student,
      ),
    );
  };

  const deleteEstudiante = (id: number) => {
    setEstudiantes(prev => prev.filter(student => student.id !== id));
  };

  const regenerateEstudiantePassword = (id: number) => {
    const temporaryPassword = generateTemporaryPassword();
    let regeneratedUsername = '';
    let found = false;

    setEstudiantes(prev =>
      prev.map(student => {
        if (student.id !== id) return student;

        found = true;
        regeneratedUsername = student.username;
        return {
          ...student,
          password: temporaryPassword,
          mustChangePassword: true,
        };
      }),
    );

    if (!found) return null;

    return {
      username: regeneratedUsername,
      temporaryPassword,
    };
  };

  const authenticateEstudiante = (username: string, password: string) => {
    const normalizedUsername = normalize(username);
    const matchedStudent = estudiantes.find(
      student => normalize(student.username) === normalizedUsername && student.password === password,
    );

    if (!matchedStudent) return null;

    return {
      userId: String(matchedStudent.id),
      email: matchedStudent.email,
      token: `local-token-student-${matchedStudent.id}`,
      refreshToken: `local-refresh-student-${matchedStudent.id}`,
      roles: ['estudiante'],
      username: matchedStudent.username,
      mustChangePassword: matchedStudent.mustChangePassword,
    };
  };

  const changeStudentPassword = (email: string, newPassword: string) => {
    const normalizedEmail = normalize(email);
    let changed = false;

    setEstudiantes(prev =>
      prev.map(student => {
        if (normalize(student.email) !== normalizedEmail) {
          return student;
        }

        changed = true;
        return {
          ...student,
          password: newPassword,
          mustChangePassword: false,
        };
      }),
    );

    return changed;
  };

  const value = useMemo(
    () => ({
      estudiantes,
      addEstudiante,
      updateEstudiante,
      deleteEstudiante,
      regenerateEstudiantePassword,
      authenticateEstudiante,
      changeStudentPassword,
    }),
    [estudiantes],
  );

  return <EstudiantesContext.Provider value={value}>{children}</EstudiantesContext.Provider>;
}

export function useEstudiantes() {
  const context = useContext(EstudiantesContext);

  if (!context) {
    throw new Error('useEstudiantes must be used within an EstudiantesProvider');
  }

  return context;
}