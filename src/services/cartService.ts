import type { CartItem, Cart } from '../types';
import { STORAGE_KEYS } from '../utils/constants';
import { calculateCartTotal, calculateItemCount } from '../utils/helpers';

/**
 * Servicio para manejar el carrito de compras
 */

const getStorageCart = (): Cart => {
  const stored = localStorage.getItem(STORAGE_KEYS.CART);
  return stored ? JSON.parse(stored) : { items: [], total: 0, itemCount: 0 };
};

const saveStorageCart = (cart: Cart): void => {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
};

export const cartService = {
  /**
   * Obtiene el carrito actual
   */
  getCart: async (): Promise<Cart> => {
    return getStorageCart();
  },

  /**
   * Agrega un producto al carrito
   */
  addToCart: async (cartItem: CartItem): Promise<Cart> => {
    const cart = getStorageCart();
    const existingItem = cart.items.find(item => item.product.id === cartItem.product.id);

    if (existingItem) {
      existingItem.quantity += cartItem.quantity;
    } else {
      cart.items.push(cartItem);
    }

    cart.total = calculateCartTotal(cart.items);
    cart.itemCount = calculateItemCount(cart.items);
    saveStorageCart(cart);

    return cart;
  },

  /**
   * Elimina un producto del carrito
   */
  removeFromCart: async (productId: string): Promise<Cart> => {
    const cart = getStorageCart();
    cart.items = cart.items.filter(item => item.product.id !== productId);

    cart.total = calculateCartTotal(cart.items);
    cart.itemCount = calculateItemCount(cart.items);
    saveStorageCart(cart);

    return cart;
  },

  /**
   * Actualiza la cantidad de un producto en el carrito
   */
  updateItemQuantity: async (productId: string, quantity: number): Promise<Cart> => {
    const cart = getStorageCart();
    const item = cart.items.find(item => item.product.id === productId);

    if (item) {
      if (quantity <= 0) {
        cart.items = cart.items.filter(item => item.product.id !== productId);
      } else {
        item.quantity = quantity;
      }
    }

    cart.total = calculateCartTotal(cart.items);
    cart.itemCount = calculateItemCount(cart.items);
    saveStorageCart(cart);

    return cart;
  },

  /**
   * Limpia el carrito
   */
  clearCart: async (): Promise<Cart> => {
    const emptyCart: Cart = { items: [], total: 0, itemCount: 0 };
    saveStorageCart(emptyCart);
    return emptyCart;
  },
};
