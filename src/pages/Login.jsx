import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      navigate("/");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Iniciar Sesión
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <div className="flex items-center border rounded mb-3 p-2">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Usuario"
            className="w-full outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex items-center border rounded mb-3 p-2">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
