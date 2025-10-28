import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Sobre Nosotros */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">🛍️ Online Sales</h3>
            <p className="text-sm text-gray-400">
              Tu tienda online de confianza con los mejores productos y servicio al cliente.
            </p>
          </div>

          {/* Enlaces Útiles */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition">
                  Productos
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Acerca de
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@onlinesales.com" className="hover:text-white transition">
                  info@onlinesales.com
                </a>
              </li>
              <li>Bogotá, Colombia</li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="text-white font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-700 py-8">
          <p className="text-center text-sm text-gray-400">
            © {currentYear} Online Sales. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
