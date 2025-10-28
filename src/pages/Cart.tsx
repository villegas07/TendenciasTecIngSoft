import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../context";
import { Button } from "../components/common";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import { formatCurrency } from "../utils";
import { showCheckoutSuccess, showDeleteConfirmAlert, showRemoveFromCartSuccess, showConfirmAlert } from "../utils/alerts";

export default function Cart() {
  const { cart, removeFromCart, updateItemQuantity, clearCart } = useCartContext();
  const navigate = useNavigate();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Carrito Vacío</h1>
          <p className="text-gray-600 mb-8">
            Parece que aún no has agregado productos a tu carrito.
          </p>
          <Link to="/products">
            <Button size="lg">
              Continuar Comprando
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    // Confirmar compra
    const confirmed = await showConfirmAlert(
      '¿Confirmar Compra?',
      `Tu total es ${formatCurrency(cart.total)}. ¿Deseas continuar?`,
      'Proceder al Pago'
    );

    if (confirmed) {
      const orderNumber = `ORD-${Date.now()}`;
      showCheckoutSuccess(orderNumber);
      // En el futuro, aquí irías a una página de checkout
    }
  };

  const handleRemoveItem = async (productName: string, productId: string) => {
    const confirmed = await showDeleteConfirmAlert(`"${productName}"`);
    if (confirmed) {
      removeFromCart(productId);
      showRemoveFromCartSuccess(productName);
    }
  };

  const handleClearCart = async () => {
    const confirmed = await showConfirmAlert(
      '¿Vaciar Carrito?',
      '¿Estás seguro de que deseas eliminar todos los productos de tu carrito?',
      'Sí, vaciar'
    );
    if (confirmed) {
      clearCart();
      showRemoveFromCartSuccess('Carrito');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/products")}
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4 transition"
        >
          <ArrowLeft size={20} />
          Continuar comprando
        </button>
        <h1 className="text-4xl font-bold text-gray-800">Tu Carrito de Compras</h1>
        <p className="text-gray-600 mt-2">
          {cart.items.length} {cart.items.length === 1 ? "producto" : "productos"} en tu carrito
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {cart.items.map((item) => (
              <div key={item.product.id} className="border-b pb-6 last:border-b-0">
                <div className="flex gap-4">
                  {/* Imagen */}
                  <div className="shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Información del producto */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product.name, item.product.id)}
                        className="text-red-600 hover:text-red-700 transition p-2"
                        title="Eliminar del carrito"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* Precio y cantidad */}
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-4">
                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
                          <button
                            onClick={() =>
                              updateItemQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="px-2 py-1 text-gray-600 hover:text-gray-800 transition"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateItemQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="px-2 py-1 text-gray-600 hover:text-gray-800 transition"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm text-gray-600">
                          {formatCurrency(item.product.price)} c/u
                        </span>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="text-xl font-bold text-indigo-600">
                          {formatCurrency(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón limpiar carrito */}
          {cart.items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="mt-6 text-red-600 hover:text-red-700 flex items-center gap-2 transition"
            >
              <Trash2 size={20} />
              Limpiar carrito
            </button>
          )}
        </div>

        {/* Resumen del pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen del Pedido</h2>

            <div className="space-y-4 mb-6">
              {/* Subtotal */}
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.items.length} producto{cart.items.length !== 1 ? "s" : ""})</span>
                <span>{formatCurrency(cart.total)}</span>
              </div>

              {/* Envío (simulado) */}
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-green-600 font-semibold">Gratis</span>
              </div>

              {/* Impuesto (simulado) */}
              <div className="flex justify-between text-gray-600">
                <span>Impuesto</span>
                <span>{formatCurrency(Math.round(cart.total * 0.08))}</span>
              </div>

              {/* Línea separadora */}
              <div className="border-t pt-4"></div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-indigo-600">
                  {formatCurrency(cart.total + Math.round(cart.total * 0.08))}
                </span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition"
              >
                Proceder al Pago
              </button>
              <Link to="/products" className="block">
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-lg transition">
                  Continuar Comprando
                </button>
              </Link>
            </div>

            {/* Información adicional */}
            <div className="mt-6 pt-6 border-t text-sm text-gray-600 space-y-2">
              <p>✓ Pago seguro</p>
              <p>✓ Envío confiable</p>
              <p>✓ Devoluciones fáciles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
