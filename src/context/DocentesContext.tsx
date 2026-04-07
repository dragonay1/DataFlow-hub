import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export interface Docente {
  id: number;
  nombre: string;
  email: string;
  clases: string[];
  username: string;
  password: string;
  mustChangePassword: boolean;
}

type NewDocenteInput = {
  nombre: string;
  email: string;
  clases: string[];
  username: string;
  temporaryPassword: string;
};

type AuthenticatedTeacher = {
  userId: string;
  email: string;
  token: string;
  refreshToken: string;
  roles: string[];
  username: string;
  mustChangePassword: boolean;
};

interface DocentesContextValue {
  docentes: Docente[];
  addDocente: (docente: NewDocenteInput) => { username: string; temporaryPassword: string };
  updateDocente: (id: number, docente: NewDocenteInput) => void;
  deleteDocente: (id: number) => void;
  regenerateDocentePassword: (id: number) => { username: string; temporaryPassword: string } | null;
  getDocenteByEmail: (email: string) => Docente | undefined;
  authenticateDocente: (username: string, password: string) => AuthenticatedTeacher | null;
  changeDocentePassword: (email: string, newPassword: string) => boolean;
}

const DocentesContext = createContext<DocentesContextValue | undefined>(undefined);
const STORAGE_KEY = 'dataflowhub_docentes';

const normalize = (value: string) => value.trim().toLowerCase();

const generateTemporaryPassword = () => {
  const partA = Math.random().toString(36).slice(2, 6).toUpperCase();
  const partB = Math.random().toString(36).slice(2, 6);
  return `${partA}${partB}`;
};

const initialDocentes: Docente[] = [
  {
    id: 1,
    nombre: 'Docente Demo',
    email: 'docente@local.dev',
    clases: ['Programación', 'API Web'],
    username: 'docente',
    password: '123',
    mustChangePassword: false,
  },
];

const loadDocentes = (): Docente[] => {
  if (typeof window === 'undefined') return initialDocentes;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialDocentes;

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return initialDocentes;

    return parsed as Docente[];
  } catch {
    return initialDocentes;
  }
};

export function DocentesProvider({ children }: { children: ReactNode }) {
  const [docentes, setDocentes] = useState<Docente[]>(loadDocentes);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(docentes));
  }, [docentes]);

  const addDocente = (docente: NewDocenteInput) => {
    const username = docente.username.trim();
    const temporaryPassword = docente.temporaryPassword.trim();
    setDocentes(prev => {
      return [
        ...prev,
        {
          id: Date.now(),
          nombre: docente.nombre.trim(),
          email: normalize(docente.email),
          clases: docente.clases,
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

  const updateDocente = (id: number, docente: NewDocenteInput) => {
    setDocentes(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              nombre: docente.nombre.trim(),
              email: normalize(docente.email),
              clases: docente.clases,
              username: docente.username.trim(),
              password: docente.temporaryPassword.trim(),
              mustChangePassword: true,
            }
          : item,
      ),
    );
  };

  const deleteDocente = (id: number) => {
    setDocentes(prev => prev.filter(item => item.id !== id));
  };

  const regenerateDocentePassword = (id: number) => {
    const temporaryPassword = generateTemporaryPassword();
    let regeneratedUsername = '';
    let found = false;

    setDocentes(prev =>
      prev.map(teacher => {
        if (teacher.id !== id) return teacher;

        found = true;
        regeneratedUsername = teacher.username;
        return {
          ...teacher,
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

  const getDocenteByEmail = (email: string) => {
    const normalizedEmail = normalize(email);
    return docentes.find(docente => normalize(docente.email) === normalizedEmail);
  };

  const authenticateDocente = (username: string, password: string) => {
    const normalizedUsername = normalize(username);
    const matchedTeacher = docentes.find(
      teacher =>
        (normalize(teacher.username) === normalizedUsername || normalize(teacher.email) === normalizedUsername) &&
        teacher.password === password,
    );

    if (!matchedTeacher) return null;

    return {
      userId: String(matchedTeacher.id),
      email: matchedTeacher.email,
      token: `local-token-teacher-${matchedTeacher.id}`,
      refreshToken: `local-refresh-teacher-${matchedTeacher.id}`,
      roles: ['docente'],
      username: matchedTeacher.username,
      mustChangePassword: matchedTeacher.mustChangePassword,
    };
  };

  const changeDocentePassword = (email: string, newPassword: string) => {
    const normalizedEmail = normalize(email);
    let changed = false;

    setDocentes(prev =>
      prev.map(teacher => {
        if (normalize(teacher.email) !== normalizedEmail) {
          return teacher;
        }

        changed = true;
        return {
          ...teacher,
          password: newPassword,
          mustChangePassword: false,
        };
      }),
    );

    return changed;
  };

  const value = useMemo(
    () => ({
      docentes,
      addDocente,
      updateDocente,
      deleteDocente,
      regenerateDocentePassword,
      getDocenteByEmail,
      authenticateDocente,
      changeDocentePassword,
    }),
    [docentes],
  );

  return <DocentesContext.Provider value={value}>{children}</DocentesContext.Provider>;
}

export function useDocentes() {
  const context = useContext(DocentesContext);

  if (!context) {
    throw new Error('useDocentes must be used within a DocentesProvider');
  }

  return context;
}