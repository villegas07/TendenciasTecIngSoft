/**
 * Servicio de Gestión de Catálogo
 * 
 * Responsabilidades:
 * - Gestionar productos (CRUD)
 * - Búsqueda y filtrado
 * - Validación de datos
 * - Persistencia en localStorage
 */

import type { Product } from '../types';

const CATALOG_KEY = 'catalog_products';
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: "Camisa básica",
    price: 45000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description: "Camisa de algodón cómoda y versátil para uso diario.",
    category: "Ropa",
    stock: 15,
    rating: 4.5,
  },
  {
    id: '2',
    name: "Tenis deportivos",
    price: 120000,
    image: "https://images.unsplash.com/photo-1600181953309-4a1c93b8e91e",
    description: "Tenis ligeros ideales para entrenamiento o actividades diarias.",
    category: "Calzado",
    stock: 8,
    rating: 4.8,
  },
  {
    id: '3',
    name: "Gorra casual",
    price: 35000,
    image: "https://images.unsplash.com/photo-1586281380434-3e0eaf3d5b08",
    description: "Gorra con estilo clásico y materiales de alta calidad.",
    category: "Accesorios",
    stock: 20,
    rating: 4.2,
  },
  {
    id: '4',
    name: "Chaqueta liviana",
    price: 99000,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    description: "Chaqueta ideal para clima fresco, con diseño moderno.",
    category: "Ropa",
    stock: 12,
    rating: 4.6,
  },
];

/**
 * Inicializar catálogo si no existe
 */
function initializeCatalog(): void {
  const existing = localStorage.getItem(CATALOG_KEY);
  if (!existing) {
    localStorage.setItem(CATALOG_KEY, JSON.stringify(INITIAL_PRODUCTS));
  }
}

/**
 * Obtener catálogo completo
 */
export const getAllProducts = (): Product[] => {
  initializeCatalog();
  const stored = localStorage.getItem(CATALOG_KEY);
  return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
};

/**
 * Obtener producto por ID
 */
export const getProductById = (id: string): Product | undefined => {
  const products = getAllProducts();
  return products.find(p => p.id === id);
};

/**
 * Agregar nuevo producto (solo vendedores)
 */
export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const products = getAllProducts();
  
  // Generar ID único
  const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const newProduct: Product = {
    ...product,
    id: newId,
  };
  
  products.push(newProduct);
  localStorage.setItem(CATALOG_KEY, JSON.stringify(products));
  
  return newProduct;
};

/**
 * Actualizar producto (solo vendedores)
 */
export const updateProduct = (id: string, updates: Partial<Omit<Product, 'id'>>): Product | null => {
  const products = getAllProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  const updatedProduct = {
    ...products[index],
    ...updates,
  };
  
  products[index] = updatedProduct;
  localStorage.setItem(CATALOG_KEY, JSON.stringify(products));
  
  return updatedProduct;
};

/**
 * Eliminar producto (solo vendedores)
 */
export const deleteProduct = (id: string): boolean => {
  const products = getAllProducts();
  const filtered = products.filter(p => p.id !== id);
  
  if (filtered.length === products.length) return false;
  
  localStorage.setItem(CATALOG_KEY, JSON.stringify(filtered));
  return true;
};

/**
 * Buscar productos por nombre
 */
export const searchProducts = (query: string): Product[] => {
  const products = getAllProducts();
  const lowercaseQuery = query.toLowerCase();
  
  return products.filter(p =>
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery)
  );
};

/**
 * Filtrar productos por categoría
 */
export const getProductsByCategory = (category: string): Product[] => {
  const products = getAllProducts();
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

/**
 * Obtener todas las categorías únicas
 */
export const getCategories = (): string[] => {
  const products = getAllProducts();
  const categories = new Set(products.map(p => p.category));
  return Array.from(categories).sort();
};

/**
 * Filtrar por rango de precio
 */
export const filterByPriceRange = (minPrice: number, maxPrice: number): Product[] => {
  const products = getAllProducts();
  return products.filter(p => p.price >= minPrice && p.price <= maxPrice);
};

/**
 * Filtrar por disponibilidad (stock > 0)
 */
export const getAvailableProducts = (): Product[] => {
  const products = getAllProducts();
  return products.filter(p => p.stock > 0);
};

/**
 * Filtrar por rating mínimo
 */
export const getTopRatedProducts = (minRating: number = 4): Product[] => {
  const products = getAllProducts();
  return products
    .filter(p => p.rating >= minRating)
    .sort((a, b) => b.rating - a.rating);
};

/**
 * Combinar búsqueda con filtros
 */
export interface ProductFilter {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStockOnly?: boolean;
}

export const searchProductsAdvanced = (filters: ProductFilter): Product[] => {
  let results = getAllProducts();
  
  // Búsqueda por texto
  if (filters.query) {
    const lowercaseQuery = filters.query.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  // Filtro por categoría
  if (filters.category) {
    results = results.filter(p =>
      p.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }
  
  // Filtro por precio
  if (filters.minPrice !== undefined) {
    results = results.filter(p => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter(p => p.price <= filters.maxPrice!);
  }
  
  // Filtro por rating
  if (filters.minRating !== undefined) {
    results = results.filter(p => p.rating >= filters.minRating!);
  }
  
  // Filtro por disponibilidad
  if (filters.inStockOnly) {
    results = results.filter(p => p.stock > 0);
  }
  
  return results;
};

/**
 * Actualizar stock de un producto
 */
export const updateProductStock = (id: string, quantity: number): Product | null => {
  const product = getProductById(id);
  if (!product) return null;
  
  const newStock = Math.max(0, product.stock + quantity);
  return updateProduct(id, { stock: newStock });
};

/**
 * Validar datos de producto
 */
export interface ProductValidationError {
  field: string;
  message: string;
}

export const validateProduct = (
  product: Omit<Product, 'id'>
): ProductValidationError[] => {
  const errors: ProductValidationError[] = [];
  
  if (!product.name || product.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'El nombre es requerido' });
  }
  
  if (product.name.length < 3) {
    errors.push({ field: 'name', message: 'El nombre debe tener al menos 3 caracteres' });
  }
  
  if (product.price < 0) {
    errors.push({ field: 'price', message: 'El precio no puede ser negativo' });
  }
  
  if (!product.description || product.description.trim().length === 0) {
    errors.push({ field: 'description', message: 'La descripción es requerida' });
  }
  
  if (product.description.length < 10) {
    errors.push({ field: 'description', message: 'La descripción debe tener al menos 10 caracteres' });
  }
  
  if (!product.category || product.category.trim().length === 0) {
    errors.push({ field: 'category', message: 'La categoría es requerida' });
  }
  
  if (product.stock < 0) {
    errors.push({ field: 'stock', message: 'El stock no puede ser negativo' });
  }
  
  if (!product.image || !product.image.startsWith('http')) {
    errors.push({ field: 'image', message: 'La imagen debe ser una URL válida' });
  }
  
  if (product.rating < 0 || product.rating > 5) {
    errors.push({ field: 'rating', message: 'El rating debe estar entre 0 y 5' });
  }
  
  return errors;
};

/**
 * Obtener estadísticas del catálogo
 */
export interface CatalogStats {
  totalProducts: number;
  totalCategories: number;
  averagePrice: number;
  averageRating: number;
  productsInStock: number;
  productsOutOfStock: number;
  highestPrice: number;
  lowestPrice: number;
}

export const getCatalogStats = (): CatalogStats => {
  const products = getAllProducts();
  
  if (products.length === 0) {
    return {
      totalProducts: 0,
      totalCategories: 0,
      averagePrice: 0,
      averageRating: 0,
      productsInStock: 0,
      productsOutOfStock: 0,
      highestPrice: 0,
      lowestPrice: 0,
    };
  }
  
  const categories = new Set(products.map(p => p.category));
  const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
  const totalRating = products.reduce((sum, p) => sum + p.rating, 0);
  const inStock = products.filter(p => p.stock > 0).length;
  const prices = products.map(p => p.price);
  
  return {
    totalProducts: products.length,
    totalCategories: categories.size,
    averagePrice: Math.round(totalPrice / products.length),
    averageRating: Math.round((totalRating / products.length) * 10) / 10,
    productsInStock: inStock,
    productsOutOfStock: products.length - inStock,
    highestPrice: Math.max(...prices),
    lowestPrice: Math.min(...prices),
  };
};

/**
 * Exportar catálogo a JSON
 */
export const exportCatalog = (): string => {
  const products = getAllProducts();
  return JSON.stringify(products, null, 2);
};

/**
 * Importar catálogo desde JSON
 */
export const importCatalog = (json: string): boolean => {
  try {
    const products = JSON.parse(json);
    
    // Validar estructura
    if (!Array.isArray(products)) {
      throw new Error('El JSON debe ser un array');
    }
    
    localStorage.setItem(CATALOG_KEY, JSON.stringify(products));
    return true;
  } catch (error) {
    console.error('Error importing catalog:', error);
    return false;
  }
};

/**
 * Resetear catálogo a valores iniciales
 */
export const resetCatalog = (): void => {
  localStorage.setItem(CATALOG_KEY, JSON.stringify(INITIAL_PRODUCTS));
};
