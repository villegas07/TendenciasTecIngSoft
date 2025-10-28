import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useCatalog } from '../../hooks/useCatalog';
import { Button } from '../common';
import type { ProductFilter } from '../../services/catalogService';

interface SearchBarProps {
  onSearch: (filters: ProductFilter) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { categories } = useCatalog();
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleSearch = () => {
    const filters: ProductFilter = {
      query: query || undefined,
      category: selectedCategory || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      minRating: minRating ? parseFloat(minRating) : undefined,
      inStockOnly,
    };

    onSearch(filters);
  };

  const handleReset = () => {
    setQuery('');
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setMinRating('');
    setInStockOnly(false);
    onSearch({});
  };

  const hasActiveFilters =
    query || selectedCategory || minPrice || maxPrice || minRating || inStockOnly;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Barra de búsqueda principal */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
        <Button onClick={handleSearch}>
          <Search size={20} />
          Buscar
        </Button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
        >
          <Filter size={20} />
          Filtros
        </button>
      </div>

      {/* Panel de filtros */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              >
                <option value="">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Precio mínimo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio Mínimo
              </label>
              <input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* Precio máximo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio Máximo
              </label>
              <input
                type="number"
                placeholder="999999"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* Rating mínimo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating Mínimo
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              >
                <option value="">Cualquier rating</option>
                <option value="3">3 estrellas +</option>
                <option value="4">4 estrellas +</option>
                <option value="4.5">4.5 estrellas +</option>
                <option value="5">5 estrellas</option>
              </select>
            </div>

            {/* Stock */}
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 border rounded focus:ring-2 focus:ring-indigo-400"
                />
                <span className="text-sm font-medium text-gray-700">Solo disponibles</span>
              </label>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 justify-end">
            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2"
              >
                <X size={18} />
                Limpiar Filtros
              </button>
            )}
            <Button onClick={handleSearch}>Aplicar Filtros</Button>
          </div>
        </div>
      )}
    </div>
  );
};
