import { createContext, useContext, useEffect, useState, type ReactNode, useCallback } from 'react';
import type { Cart, CartItem } from '../types';
import { cartService } from '../services';

interface CartContextType {
  cart: Cart;
  isLoading: boolean;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateItemQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const refetchCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const updatedCart = await cartService.getCart();
      setCart(updatedCart);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (item: CartItem) => {
    setIsLoading(true);
    try {
      const updatedCart = await cartService.addToCart(item);
      setCart(updatedCart);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (productId: string) => {
    setIsLoading(true);
    try {
      const updatedCart = await cartService.removeFromCart(productId);
      setCart(updatedCart);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateItemQuantity = useCallback(async (productId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const updatedCart = await cartService.updateItemQuantity(productId, quantity);
      setCart(updatedCart);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const emptyCart = await cartService.clearCart();
      setCart(emptyCart);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar carrito al montar el componente
  useEffect(() => {
    refetchCart();
  }, [refetchCart]);

  const value: CartContextType = {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
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
