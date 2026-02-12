import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Estudiantes from "./pages/Estudiantes";
import Docentes from "./pages/Docentes";
import Cursos from "./pages/Cursos";
import Matriculas from "./pages/Matriculas";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/docentes" element={<Docentes />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/matriculas" element={<Matriculas />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
