import type { Product, ProductFilters } from '../types';

/**
 * Servicio para manejar productos
 * Aquí va la lógica de negocio relacionada con productos
 */

// Simulación de productos (reemplazar con API en futuro)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    description: 'Laptop de alto rendimiento',
    price: 1200,
    image: '/images/laptop.jpg',
    category: 'Electrónica',
    stock: 10,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Mouse Inalámbrico',
    description: 'Mouse ergonómico inalámbrico',
    price: 25,
    image: '/images/mouse.jpg',
    category: 'Accesorios',
    stock: 50,
    rating: 4,
  },
];

export const productService = {
  /**
   * Obtiene todos los productos
   */
  getProducts: async (filters?: ProductFilters): Promise<Product[]> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    let products = [...mockProducts];

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      products = products.filter(
        p => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)
      );
    }

    if (filters?.category) {
      products = products.filter(p => p.category === filters.category);
    }

    if (filters?.minPrice !== undefined) {
      products = products.filter(p => p.price >= filters.minPrice!);
    }

    if (filters?.maxPrice !== undefined) {
      products = products.filter(p => p.price <= filters.maxPrice!);
    }

    return products;
  },

  /**
   * Obtiene un producto por ID
   */
  getProductById: async (id: string): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.find(p => p.id === id) || null;
  },

  /**
   * Obtiene productos por categoría
   */
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockProducts.filter(p => p.category === category);
  },

  /**
   * Obtiene las categorías disponibles
   */
  getCategories: async (): Promise<string[]> => {
    const categories = new Set(mockProducts.map(p => p.category));
    return Array.from(categories);
  },
};
