/**
 * Hook: useCatalog
 * 
 * Proporciona acceso a todas las funciones de gestión de catálogo
 * Incluye búsqueda, filtrado, CRUD de productos y estadísticas
 */

import { useState, useCallback, useEffect } from 'react';
import type { Product } from '../types';
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory,
  getCategories,
  filterByPriceRange,
  getAvailableProducts,
  getTopRatedProducts,
  searchProductsAdvanced,
  updateProductStock,
  validateProduct,
  getCatalogStats,
  type CatalogStats,
  type ProductValidationError,
  type ProductFilter,
} from '../services/catalogService';

interface UseCatalogReturn {
  // Datos
  products: Product[];
  categories: string[];
  stats: CatalogStats;
  isLoading: boolean;
  
  // Búsqueda y filtrado
  searchByQuery: (query: string) => Product[];
  searchAdvanced: (filters: ProductFilter) => Product[];
  filterByCategory: (category: string) => Product[];
  filterByPrice: (min: number, max: number) => Product[];
  getAvailable: () => Product[];
  getTopRated: (minRating?: number) => Product[];
  
  // CRUD
  getById: (id: string) => Product | undefined;
  add: (product: Omit<Product, 'id'>) => Product | null;
  update: (id: string, updates: Partial<Omit<Product, 'id'>>) => Product | null;
  delete: (id: string) => boolean;
  updateStock: (id: string, quantity: number) => Product | null;
  
  // Validación
  validate: (product: Omit<Product, 'id'>) => ProductValidationError[];
  
  // Utilidades
  refreshCatalog: () => void;
}

export const useCatalog = (): UseCatalogReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [stats, setStats] = useState<CatalogStats>({
    totalProducts: 0,
    totalCategories: 0,
    averagePrice: 0,
    averageRating: 0,
    productsInStock: 0,
    productsOutOfStock: 0,
    highestPrice: 0,
    lowestPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Cargar catálogo inicial
  const refreshCatalog = useCallback(() => {
    setIsLoading(true);
    try {
      const allProducts = getAllProducts();
      const allCategories = getCategories();
      const catalogStats = getCatalogStats();
      
      setProducts(allProducts);
      setCategories(allCategories);
      setStats(catalogStats);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Cargar al montar
  useEffect(() => {
    refreshCatalog();
  }, [refreshCatalog]);

  // Búsqueda por query
  const searchByQuery = useCallback((query: string) => {
    return searchProducts(query);
  }, []);

  // Búsqueda avanzada
  const searchAdvanced = useCallback((filters: ProductFilter) => {
    return searchProductsAdvanced(filters);
  }, []);

  // Filtrar por categoría
  const filterByCategory = useCallback((category: string) => {
    return getProductsByCategory(category);
  }, []);

  // Filtrar por precio
  const filterByPrice = useCallback((min: number, max: number) => {
    return filterByPriceRange(min, max);
  }, []);

  // Obtener disponibles
  const getAvailable = useCallback(() => {
    return getAvailableProducts();
  }, []);

  // Obtener top rated
  const getTopRated = useCallback((minRating = 4) => {
    return getTopRatedProducts(minRating);
  }, []);

  // Obtener por ID
  const getById = useCallback((id: string) => {
    return getProductById(id);
  }, []);

  // Agregar producto
  const add = useCallback((product: Omit<Product, 'id'>) => {
    const errors = validateProduct(product);
    if (errors.length > 0) {
      console.error('Validation errors:', errors);
      return null;
    }

    const newProduct = addProduct(product);
    refreshCatalog();
    return newProduct;
  }, [refreshCatalog]);

  // Actualizar producto
  const update = useCallback((id: string, updates: Partial<Omit<Product, 'id'>>) => {
    const updated = updateProduct(id, updates);
    if (updated) {
      refreshCatalog();
    }
    return updated;
  }, [refreshCatalog]);

  // Eliminar producto
  const deleteProduct_fn = useCallback((id: string) => {
    const deleted = deleteProduct(id);
    if (deleted) {
      refreshCatalog();
    }
    return deleted;
  }, [refreshCatalog]);

  // Actualizar stock
  const updateStock_fn = useCallback((id: string, quantity: number) => {
    const updated = updateProductStock(id, quantity);
    if (updated) {
      refreshCatalog();
    }
    return updated;
  }, [refreshCatalog]);

  // Validar
  const validate_fn = useCallback((product: Omit<Product, 'id'>) => {
    return validateProduct(product);
  }, []);

  return {
    // Datos
    products,
    categories,
    stats,
    isLoading,
    
    // Búsqueda y filtrado
    searchByQuery,
    searchAdvanced,
    filterByCategory,
    filterByPrice,
    getAvailable,
    getTopRated,
    
    // CRUD
    getById,
    add,
    update,
    delete: deleteProduct_fn,
    updateStock: updateStock_fn,
    
    // Validación
    validate: validate_fn,
    
    // Utilidades
    refreshCatalog,
  };
};
