import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<'vendedor' | 'comprador'>('comprador');
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuthContext();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 🔍 Validaciones básicas
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un correo válido.");
      return;
    }

    try {
      setIsLoading(true);
      await register({
        name,
        email,
        password,
        confirmPassword,
        role,
      });

      // ✅ Registro exitoso
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Crear Cuenta
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Nombre completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Tu nombre"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="ejemplo@email.com"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">¿Cuál es tu rol?</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition" style={{borderColor: role === 'comprador' ? '#4f46e5' : '#d1d5db'}}>
                <input
                  type="radio"
                  name="role"
                  value="comprador"
                  checked={role === 'comprador'}
                  onChange={(e) => setRole(e.target.value as 'comprador')}
                  className="w-4 h-4"
                  disabled={isLoading}
                />
                <div>
                  <div className="font-medium text-gray-800">👤 Comprador</div>
                  <div className="text-xs text-gray-500">Busca y compra productos</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition" style={{borderColor: role === 'vendedor' ? '#4f46e5' : '#d1d5db'}}>
                <input
                  type="radio"
                  name="role"
                  value="vendedor"
                  checked={role === 'vendedor'}
                  onChange={(e) => setRole(e.target.value as 'vendedor')}
                  className="w-4 h-4"
                  disabled={isLoading}
                />
                <div>
                  <div className="font-medium text-gray-800">🏪 Vendedor</div>
                  <div className="text-xs text-gray-500">Gestiona tu catálogo de productos</div>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline font-semibold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
