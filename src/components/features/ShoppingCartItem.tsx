import React from 'react';
import { Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { Card, Button } from '../common';
import { formatCurrency } from '../../utils';

interface ShoppingCartItemProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  isLoading?: boolean;
}

export const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
  isLoading = false,
}) => {
  return (
    <Card className="p-4 flex gap-4">
      {/* Imagen */}
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      {/* Detalles */}
      <div className="flex-1">
        <h3 className="font-bold text-lg text-gray-900">{item.product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.product.description}</p>
        <p className="font-bold text-lg text-blue-600">{formatCurrency(item.product.price)}</p>
      </div>

      {/* Cantidad y Acciones */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQuantityChange(item.quantity - 1)}
            className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
            disabled={isLoading}
          >
            -
          </button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <button
            onClick={() => onQuantityChange(item.quantity + 1)}
            className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
            disabled={isLoading}
          >
            +
          </button>
        </div>

        <div className="text-right min-w-24">
          <p className="text-sm text-gray-600">Total</p>
          <p className="font-bold text-lg text-gray-900">
            {formatCurrency(item.product.price * item.quantity)}
          </p>
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={onRemove}
          disabled={isLoading}
          className="ml-4"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </Card>
  );
};
