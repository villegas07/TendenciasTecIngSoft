export type { Product, ProductFilters } from './product';
export type { CartItem, Cart, CartAction } from './cart';
export type { User, AuthCredentials, RegisterData, AuthResponse, AuthContextType } from './user';
export type { Order, OrderItem, Address } from './order';
export type { Review, ReviewInput } from './review';

// Enums como const objects para evitar problemas con TypeScript
export const OrderStatus = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];
