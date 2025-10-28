import { Link } from "react-router-dom";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, price, image }: ProductProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-transform hover:scale-[1.02]">
      {/* 🔗 Imagen con enlace al detalle */}
      <Link to={`/productos/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform hover:scale-105"
        />
      </Link>

      <div className="p-4">
        {/* 🔗 Nombre con enlace al detalle */}
        <Link to={`/productos/${id}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition">
            {name}
          </h2>
        </Link>

        {/* Precio */}
        <p className="text-indigo-600 font-bold mt-2">
          ${price.toLocaleString("es-CO")}
        </p>

        {/* Botón para carrito (más adelante lo activamos) */}
        <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
