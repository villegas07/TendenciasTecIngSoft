import { products } from "../data/products";
import { ProductCard } from "../components/features";

export default function Products() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Título principal */}
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-2">
        Nuestros Productos 🛍️
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Explora nuestra colección de productos de alta calidad
      </p>

      {/* Contenedor de tarjetas */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {/* Si no hay productos */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay productos disponibles en este momento.</p>
        </div>
      )}
    </div>
  );
}
