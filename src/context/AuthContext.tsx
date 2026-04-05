import { createContext, useContext, useState, type ReactNode } from 'react';

type AuthRole = 'admin' | 'docente' | 'estudiante' | null;

interface AuthContextValue {
  role: AuthRole;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<AuthRole>(null);

  const login = (username: string, password: string) => {
    // Usuarios simulados
    if (username === 'admin' && password === '123') {
      setRole('admin');
      return true;
    }

    if (username === 'docente' && password === '123') {
      setRole('docente');
      return true;
    }

    if (username === 'estudiante' && password === '123') {
      setRole('estudiante');
      return true;
    }

    return false;
  };

  const logout = () => {
    setRole(null);
  };

  return <AuthContext.Provider value={{ role, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
