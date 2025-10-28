import { Link } from "react-router-dom";
import { useAuthContext } from "../context";
import { Button } from "../components/common";
import { ShoppingCart, Package, Truck } from "lucide-react";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            ¡Bienvenido, {user?.name}! 👋
          </h1>
          <p className="text-xl mb-8 text-indigo-100">
            Explora nuestra tienda online y encuentra los mejores productos
          </p>
          <Link to="/products">
            <Button size="lg">
              Ver Productos 🛍️
            </Button>
          </Link>
        </div>
      </section>

      {/* Características */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué comprar con nosotros?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Característica 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Compra Segura</h3>
              <p className="text-gray-600">
                Tu seguridad es nuestra prioridad. Todos tus datos están protegidos.
              </p>
            </div>

            {/* Característica 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Package className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Productos de Calidad</h3>
              <p className="text-gray-600">
                Seleccionamos solo los mejores productos para ti.
              </p>
            </div>

            {/* Característica 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Truck className="w-12 h-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Envío Rápido</h3>
              <p className="text-gray-600">
                Recibe tus pedidos en el menor tiempo posible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Productos</h2>
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-4">
              Tenemos una amplia selección de productos para todos tus necesidades.
            </p>
            <Link to="/products">
              <Button variant="secondary">
                Ver Todos los Productos →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
          <p className="text-indigo-100 mb-6">Descubre nuestros productos y encuentra lo que buscas</p>
          <Link to="/products">
            <Button size="lg" variant="secondary">
              Ir a Productos
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
