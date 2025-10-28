import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../context";
import { showLoginSuccess, showErrorAlert, showValidationErrorAlert } from "../utils/alerts";

export default function Login() {
  const { login } = useAuthContext(); // Función del contexto para login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showValidationErrorAlert(["El correo es requerido", "La contraseña es requerida"]);
      return;
    }

    try {
      // ✅ Pasar credenciales al login
      await login({ email, password });
      setError("");
      showLoginSuccess(email.split('@')[0]);
      navigate("/", { replace: true }); // Redirige a Home
    } catch (err) {
      const errorMessage = "Correo o contraseña incorrectos.";
      setError(errorMessage);
      showErrorAlert("Error en el Login", errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Iniciar Sesión
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="ejemplo@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline font-semibold">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
