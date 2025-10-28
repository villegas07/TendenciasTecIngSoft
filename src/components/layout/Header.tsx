import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Menu, X, ChevronDown, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '../../context';
import { useCartContext } from '../../context';
import { Button } from '../common';
import { showLogoutSuccess, showConfirmAlert } from '../../utils/alerts';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuthContext();
  const { cart } = useCartContext();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const confirmed = await showConfirmAlert(
      '¿Cerrar Sesión?',
      '¿Estás seguro de que deseas cerrar tu sesión?',
      'Sí, cerrar sesión'
    );

    if (confirmed) {
      logout();
      setShowDropdown(false);
      setShowMenu(false);
      showLogoutSuccess();
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600">
            <span className="text-3xl">🛍️</span>
            <span className="hidden sm:inline">Online Sales</span>
          </Link>

          {/* Navegación Desktop */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                Inicio
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-indigo-600 transition font-medium">
                Productos
              </Link>
              <Link to="/catalog-management" className="text-gray-700 hover:text-indigo-600 transition font-medium text-sm px-3 py-1 border border-indigo-200 rounded-lg hover:bg-indigo-50">
                📦 Gestión
              </Link>
              <Link to="/cart" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition font-medium">
                <ShoppingCart size={20} />
                <span className="bg-indigo-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
                  {cart.itemCount}
                </span>
              </Link>
            </nav>
          )}

          {/* Acciones Derecha */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <>
                {/* Dropdown Desktop */}
                <div className="hidden md:block relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <User size={20} className="text-indigo-600" />
                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                    <ChevronDown size={18} className={`text-gray-600 transition ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Cuenta</p>
                        <p className="font-medium text-gray-800">Hola, {user?.name}</p>
                      </div>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut size={18} />
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Menú Mobile */}
            {isAuthenticated && (
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowMenu(!showMenu)}
              >
                {showMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}

            {!isAuthenticated && (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="secondary" size="sm">
                    Ingresar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Registrarse</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Menú Mobile */}
        {showMenu && isAuthenticated && (
          <nav className="md:hidden border-t py-4 flex flex-col gap-4">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">
              Inicio
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-indigo-600 transition font-medium">
              Productos
            </Link>
            <Link to="/cart" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition font-medium">
              <ShoppingCart size={20} />
              Carrito ({cart.itemCount})
            </Link>

            {/* Usuario Mobile */}
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-gray-500 mb-2">Cuenta</p>
              <p className="font-medium text-gray-800 mb-4">Hola, {user?.name}</p>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 rounded transition"
              >
                <LogOut size={20} />
                Cerrar sesión
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
