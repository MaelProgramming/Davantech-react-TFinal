import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/mockData';
import { Star, Search } from 'lucide-react';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Todas las Marcas');

  // Filter logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'Todas las Marcas' || product.category === category;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Catálogo de Smartphones</h2>
            <p className="text-gray-500">Compara los últimos dispositivos insignia</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar móviles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-white text-gray-900 border border-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all shadow-sm"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            {/* Filter Dropdown */}
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-sm"
            >
              <option value="Todas las Marcas">Todas las Marcas</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Google">Google</option>
              <option value="Xiaomi">Xiaomi</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-orange-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-2 py-1 rounded flex items-center shadow-sm">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" />
                    {product.rating}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded uppercase font-semibold shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors truncate">
                    {product.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{product.platform}</span>
                    <span className="text-gray-900 font-bold text-lg">{product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
            <p className="text-gray-500 text-lg">No se encontraron productos.</p>
            <button 
              onClick={() => { setSearchTerm(''); setCategory('Todas las Marcas'); }}
              className="mt-4 text-orange-600 hover:text-orange-500 font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;