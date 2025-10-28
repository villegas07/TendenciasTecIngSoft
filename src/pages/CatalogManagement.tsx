import { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowLeft, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common';
import { SearchBar } from '../components/features/SearchBar';
import { AddProductModal } from '../components/features/AddProductModal';
import { useCatalog } from '../hooks/useCatalog';
import { formatCurrency } from '../utils';
import { showDeleteConfirmAlert, showSuccessAlert, showErrorAlert } from '../utils/alerts';
import type { ProductFilter } from '../services/catalogService';

export default function CatalogManagement() {
  const navigate = useNavigate();
  const { products, stats, delete: deleteProduct, refreshCatalog, searchAdvanced } = useCatalog();
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSearch = (filters: ProductFilter) => {
    const results = searchAdvanced(filters);
    setDisplayedProducts(results);
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    const confirmed = await showDeleteConfirmAlert(`"${name}"`);
    if (confirmed) {
      const success = deleteProduct(id);
      if (success) {
        showSuccessAlert('¡Eliminado!', `${name} fue removido del catálogo`);
        refreshCatalog();
        setDisplayedProducts(products.filter((p) => p.id !== id));
      } else {
        showErrorAlert('Error', 'No se pudo eliminar el producto');
      }
    }
  };

  const handleProductAdded = () => {
    refreshCatalog();
    setDisplayedProducts(products);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4 transition"
          >
            <ArrowLeft size={20} />
            Volver al Inicio
          </button>

          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Gestión de Catálogo</h1>
              <p className="text-gray-600 mt-2">Panel de control para vendedores</p>
            </div>
            <Button onClick={() => setShowAddModal(true)} size="lg">
              <Plus size={20} />
              Agregar Producto
            </Button>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Productos</p>
                  <p className="text-3xl font-bold text-indigo-600">{stats.totalProducts}</p>
                </div>
                <BarChart3 size={32} className="text-indigo-200" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Disponibles</p>
                  <p className="text-3xl font-bold text-green-600">{stats.productsInStock}</p>
                </div>
                <div className="text-2xl">✓</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Agotados</p>
                  <p className="text-3xl font-bold text-red-600">{stats.productsOutOfStock}</p>
                </div>
                <div className="text-2xl">✕</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Precio Promedio</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(stats.averagePrice)}
                  </p>
                </div>
                <div className="text-2xl">💵</div>
              </div>
            </div>
          </div>
        </div>

        {/* Búsqueda y Filtros */}
        <SearchBar onSearch={handleSearch} />

        {/* Tabla de Productos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {displayedProducts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">No hay productos que coincidan con tu búsqueda</p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus size={20} />
                Crear Primer Producto
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Imagen</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Categoría</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Precio</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rating</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {displayedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-600 truncate max-w-xs">
                          {product.description}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-indigo-600">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            product.stock > 0
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.stock} unidades
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="font-medium">{product.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Ver Detalles"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Información */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Consejos para Vendedores</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ Mantén tu inventario actualizado</li>
            <li>✓ Usa descripciones detalladas para mejorar búsquedas</li>
            <li>✓ Las imágenes de alta calidad atraen más compradores</li>
            <li>✓ Revisa regularmente los productos agotados</li>
          </ul>
        </div>
      </div>

      {/* Modal de Agregar */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
}
