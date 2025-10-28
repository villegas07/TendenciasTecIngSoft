import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../hooks";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { formatCurrency } from "../utils";
import { showAddToCartSuccess, showErrorAlert } from "../utils/alerts";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Producto no encontrado 😢</h2>
          <p className="text-gray-600 mb-6">Lo sentimos, el producto que buscas no existe.</p>
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <ArrowLeft size={20} />
            Volver a productos
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    try {
      addToCart({
        product,
        quantity,
      });
      showAddToCartSuccess(product.name, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      showErrorAlert('Error', 'No se pudo agregar el producto al carrito');
    }
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 🔙 Botón volver */}
      <button
        onClick={() => navigate("/products")}
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8 transition"
      >
        <ArrowLeft size={20} />
        Volver a productos
      </button>

      {/* 📦 Contenedor principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* 🖼️ Imagen del producto */}
        <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 📝 Información del producto */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-800">{product.name}</h1>
            
            {/* ⭐ Precio */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-indigo-600">
                {formatCurrency(product.price)}
              </p>
              <p className="text-sm text-gray-500 mt-1">Precio unitario</p>
            </div>

            {/* 📄 Descripción */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* 🛒 Opciones de compra */}
            <div className="space-y-4">
              {/* Cantidad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 px-3 py-2 border border-gray-300 rounded text-center"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-600 ml-4">
                    Total: {formatCurrency(product.price * quantity)}
                  </span>
                </div>
              </div>

              {/* Botón agregar al carrito */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2 ${
                  isAdded
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={20} />
                    ¡Agregado al carrito!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Agregar al carrito
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 💡 Información adicional */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 font-medium">SKU</p>
                <p className="text-gray-800">PROD-{String(product.id).padStart(3, "0")}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Categoría</p>
                <p className="text-gray-800">{product.category}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Stock disponible</p>
                <p className={product.stock > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {product.stock > 0 ? `${product.stock} unidades` : "Agotado"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Calificación</p>
                <p className="text-yellow-500 font-semibold">⭐ {product.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
