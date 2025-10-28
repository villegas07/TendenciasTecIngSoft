import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { ShoppingCart, User } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  if (!user) return null; // 👈 No mostrar el header si no hay usuario logueado

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-indigo-600 text-white shadow-md">
      <Link to="/" className="text-2xl font-bold">
        🛍️ Online Sales
      </Link>

      <nav className="flex items-center gap-6">
        <Link to="/productos" className="hover:underline">
          Productos
        </Link>
        <Link to="/carrito" className="flex items-center gap-1 hover:underline">
          <ShoppingCart size={20} /> Carrito
        </Link>

        {/* 👤 Menú de usuario */}
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2">
            <User size={22} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="px-4 py-2 border-b">👋 Hola, {user.name}</div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
