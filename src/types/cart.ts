import type { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface CartAction {
  type: 'ADD' | 'REMOVE' | 'UPDATE' | 'CLEAR';
  payload?: CartItem | string | number;
}
