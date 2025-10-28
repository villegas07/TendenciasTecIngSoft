import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Cart } from '../types';
import { cartService } from '../services';

interface CartContextType {
  cart: Cart;
  isLoading: boolean;
  refetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const refetchCart = async () => {
    setIsLoading(true);
    try {
      const updatedCart = await cartService.getCart();
      setCart(updatedCart);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar carrito al montar el componente
  useEffect(() => {
    refetchCart();
  }, []);

  const value: CartContextType = {
    cart,
    isLoading,
    refetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Hook para usar el contexto del carrito
 */
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext debe usarse dentro de un CartProvider');
  }
  return context;
};
