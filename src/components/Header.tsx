import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { ShoppingCart, User } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  if (!user) return null;

  const isVendedor = user.role === 'vendedor';

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-indigo-600 text-white shadow-md">
      <Link to="/" className="text-2xl font-bold">
        🛍️ Online Sales
      </Link>

      <nav className="flex items-center gap-6">
        <Link to="/productos" className="hover:underline">
          🛍️ Productos
        </Link>
        
        <Link to="/carrito" className="flex items-center gap-1 hover:underline">
          <ShoppingCart size={20} /> Carrito
        </Link>

        {/* 📦 Link de gestión SOLO para vendedores */}
        {isVendedor && (
          <Link to="/catalog-management" className="flex items-center gap-1 hover:underline">
            Gestión
          </Link>
        )}

        {/* 👤 Menú de usuario */}
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-2">
            <User size={22} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b">
                <div className="font-semibold">👋 {user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {isVendedor ? '🏪 Vendedor' : '👤 Comprador'}
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                🚪 Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
