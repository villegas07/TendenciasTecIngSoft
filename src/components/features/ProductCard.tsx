import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { Card, Button } from '../common';
import { formatCurrency } from '../../utils';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { useCartContext } from '../../context';
import { showAddToCartSuccess } from '../../utils/alerts';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isLoading } = useCartContext();
  const [isAdded, setIsAdded] = React.useState(false);

  const handleAddToCart = async () => {
    try {
      await addToCart({
        product,
        quantity: 1,
      });
      // Mostrar notificación
      showAddToCartSuccess(product.name, 1);
      // Mostrar feedback visual
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagen */}
      <div className="relative bg-gray-200 h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold">Agotado</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Categoría */}
        <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded mb-2">
          {product.category}
        </span>

        {/* Nombre */}
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{product.name}</h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.rating})</span>
        </div>

        {/* Precio */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(product.price)}</p>
          <p className="text-xs text-gray-500">Stock: {product.stock}</p>
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <Link to={`/product/${product.id}`} className="flex-1">
            <Button variant="secondary" className="w-full">
              Ver Detalles
            </Button>
          </Link>
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isLoading}
            isLoading={isLoading && !isAdded}
            className={`flex-1 ${isAdded ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
          >
            {isAdded ? (
              <>
                <Check size={18} />
              </>
            ) : (
              <ShoppingCart size={18} />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};
