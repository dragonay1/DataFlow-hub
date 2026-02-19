import { createContext, useContext, useState } from "react";

const CursosContext = createContext();

export function CursosProvider({ children }) {
  const [cursos, setCursos] = useState([
    {
      id: 1,
      nombre: "Programación",
      profesor: "Ing. Carlos Pérez",
      aula: "Aula 101",
    },
    {
      id: 2,
      nombre: "Base de Datos",
      profesor: "Ing. María López",
      aula: "Aula 202",
    },
    {
      id: 3,
      nombre: "Redes",
      profesor: "Ing. Juan Torres",
      aula: "Lab 1",
    },
    {
      id: 4,
      nombre: "API Web",
      profesor: "Ing. Ana Morales",
      aula: "Aula 303",
    },
  ]);

  return (
    <CursosContext.Provider value={{ cursos, setCursos }}>
      {children}
    </CursosContext.Provider>
  );
}

export function useCursos() {
  return useContext(CursosContext);
}
