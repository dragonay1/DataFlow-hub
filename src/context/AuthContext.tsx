import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  const login = (username, password) => {
    // Usuarios simulados
    if (username === "admin" && password === "123") {
      setRole("admin");
      return true;
    }

    if (username === "docente" && password === "123") {
      setRole("docente");
      return true;
    }

    if (username === "estudiante" && password === "123") {
      setRole("estudiante");
      return true;
    }

    return false;
  };

  const logout = () => {
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
