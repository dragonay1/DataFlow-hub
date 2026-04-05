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
import PerfilEstudiante from './pages/PerfilEstudiante.tsx';
import { hasRole } from './shared/utils/roles.ts';

function App() {
  const { isAuthenticated, userData } = useAppSelector(state => state.authentication);
  const isStudent = hasRole(userData.roles, 'student');
  const mustChangePassword = isStudent && userData.mustChangePassword;

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/perfil-estudiante" element={<PerfilEstudiante />} />
          <Route path="/cambiar-contrasena" element={<Navigate to="/perfil-estudiante" />} />
          <Route path="/" element={mustChangePassword ? <Navigate to="/perfil-estudiante" /> : <Dashboard />} />
          <Route
            path="/estudiantes"
            element={mustChangePassword ? <Navigate to="/perfil-estudiante" /> : <Estudiantes />}
          />
          <Route path="/docentes" element={mustChangePassword ? <Navigate to="/perfil-estudiante" /> : <Docentes />} />
          <Route path="/cursos" element={mustChangePassword ? <Navigate to="/perfil-estudiante" /> : <Cursos />} />
          <Route
            path="/cursos-disponibles"
            element={mustChangePassword ? <Navigate to="/perfil-estudiante" /> : <CursosDisponibles />}
          />
          <Route path="/matriculas" element={mustChangePassword ? <Navigate to="/perfil-estudiante" /> : <Matriculas />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
