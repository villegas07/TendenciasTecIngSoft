/**
 * Constantes globales de la aplicación
 */

// URLs de la API
export const API_URLS = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  PRODUCTS: '/products',
  CART: '/cart',
  AUTH: '/auth',
  USERS: '/users',
} as const;

// Claves de localStorage
export const STORAGE_KEYS = {
  CART: 'micromarket_cart',
  AUTH_TOKEN: 'micromarket_token',
  USER: 'micromarket_user',
  THEME: 'micromarket_theme',
} as const;

// Valores por defecto
export const DEFAULTS = {
  ITEMS_PER_PAGE: 12,
  CURRENCY: 'COP',
  LANGUAGE: 'es',
} as const;

// Estados de carga
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

// Mensajes de error
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Por favor intenta de nuevo.',
  INVALID_CREDENTIALS: 'Correo o contraseña inválidos.',
  USER_EXISTS: 'Este correo ya está registrado.',
  REQUIRED_FIELD: 'Este campo es requerido.',
  INVALID_EMAIL: 'Por favor ingresa un correo válido.',
  INVALID_PASSWORD: 'La contraseña debe tener al menos 6 caracteres.',
  PASSWORDS_NOT_MATCH: 'Las contraseñas no coinciden.',
} as const;

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Bienvenido de nuevo!',
  REGISTER_SUCCESS: 'Cuenta creada exitosamente. Por favor inicia sesión.',
  ITEM_ADDED: 'Producto agregado al carrito.',
  ITEM_REMOVED: 'Producto eliminado del carrito.',
} as const;
