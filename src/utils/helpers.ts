/**
 * Calcula el total del carrito
 */
export const calculateCartTotal = (items: Array<{ product: { price: number }; quantity: number }>): number => {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

/**
 * Calcula la cantidad de items en el carrito
 */
export const calculateItemCount = (items: Array<{ quantity: number }>): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

/**
 * Busca en un array de objetos por un patrón de búsqueda
 */
export const searchItems = <T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return items.filter(item =>
    searchFields.some(field => String(item[field]).toLowerCase().includes(lowerSearchTerm))
  );
};

/**
 * Ordena un array de objetos por una propiedad
 */
export const sortItems = <T extends Record<string, any>>(
  items: T[],
  field: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...items].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
};
