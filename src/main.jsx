import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { CursosProvider } from "./context/CursosContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CursosProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CursosProvider>
  </React.StrictMode>
);
