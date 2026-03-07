import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Estudiantes from './pages/Estudiantes';
import Docentes from './pages/Docentes';
import Cursos from './pages/Cursos';
import Matriculas from './pages/Matriculas';
import CursosDisponibles from './pages/CursosDisponibles';
import Layout from './components/layout.tsx';
import { useAppSelector } from './store/hooks.ts';
import Dashboard from './pages/Dashboard.tsx';

function App() {
  const { isAuthenticated } = useAppSelector(state => state.authentication);

  return (
    <Router>
      <Routes>
        {!isAuthenticated && <Route path="*" element={<Login />} />}

        {isAuthenticated && (
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
