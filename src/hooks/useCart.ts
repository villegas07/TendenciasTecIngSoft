import { useState, useCallback } from 'react';
import type { CartItem, Cart } from '../types';
import { cartService } from '../services';

/**
 * Hook para manejar el carrito de compras
 */
export const useCart = () => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [loading, setLoading] = useState(false);

  const loadCart = useCallback(async () => {
    setLoading(true);
    try {
      const currentCart = await cartService.getCart();
      setCart(currentCart);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (cartItem: CartItem) => {
    setLoading(true);
    try {
      const updatedCart = await cartService.addToCart(cartItem);
      setCart(updatedCart);
      return updatedCart;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (productId: string) => {
    setLoading(true);
    try {
      const updatedCart = await cartService.removeFromCart(productId);
      setCart(updatedCart);
      return updatedCart;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateItemQuantity = useCallback(async (productId: string, quantity: number) => {
    setLoading(true);
    try {
      const updatedCart = await cartService.updateItemQuantity(productId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    setLoading(true);
    try {
      const emptyCart = await cartService.clearCart();
      setCart(emptyCart);
      return emptyCart;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    cart,
    loading,
    loadCart,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
  };
};
