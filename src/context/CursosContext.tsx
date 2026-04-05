import { createContext, useContext, useState, type ReactNode } from 'react';

interface Curso {
  id: number;
  nombre: string;
  profesor: string;
  aula: string;
}

interface CursosContextValue {
  cursos: Curso[];
  setCursos: React.Dispatch<React.SetStateAction<Curso[]>>;
}

const CursosContext = createContext<CursosContextValue | undefined>(undefined);

export function CursosProvider({ children }: { children: ReactNode }) {
  const [cursos, setCursos] = useState([
    {
      id: 1,
      nombre: 'Programación',
      profesor: 'Ing. Carlos Pérez',
      aula: 'Aula 101',
    },
    {
      id: 2,
      nombre: 'Base de Datos',
      profesor: 'Ing. María López',
      aula: 'Aula 202',
    },
    {
      id: 3,
      nombre: 'Redes',
      profesor: 'Ing. Juan Torres',
      aula: 'Lab 1',
    },
    {
      id: 4,
      nombre: 'API Web',
      profesor: 'Ing. Ana Morales',
      aula: 'Aula 303',
    },
  ]);

  return <CursosContext.Provider value={{ cursos, setCursos }}>{children}</CursosContext.Provider>;
}

export function useCursos() {
  const context = useContext(CursosContext);

  if (!context) {
    throw new Error('useCursos must be used within a CursosProvider');
  }

  return context;
}
