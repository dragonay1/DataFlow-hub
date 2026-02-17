import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Estudiantes from "./pages/Estudiantes";
import Docentes from "./pages/Docentes";
import Cursos from "./pages/Cursos";
import Matriculas from "./pages/Matriculas";
import CursosDisponibles from "./pages/CursosDisponibles";

function App() {
  const { role } = useAuth();

  return (
    <Router>
      <Routes>

        {!role && <Route path="*" element={<Login />} />}

        {role && (
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/estudiantes" element={<Estudiantes />} />
                  <Route path="/docentes" element={<Docentes />} />
                  <Route path="/cursos" element={<Cursos />} />
                  <Route path="/cursos-disponibles" element={<CursosDisponibles />} />
                  <Route path="/matriculas" element={<Matriculas />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Layout>
            }
          />
        )}

      </Routes>
    </Router>
  );
}

export default App;
