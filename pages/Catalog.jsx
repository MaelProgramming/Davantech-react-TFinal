import React from 'react';
import { useProducts } from '../components/useProduct';
import { useCart } from '../context/CartContext'; // On importe le hook du panier
import { ShoppingCart, Star } from 'lucide-react';

const Catalog = () => {
  const { items, loading } = useProducts();
  const { addToCart } = useCart(); // On récupère la fonction d'ajout

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
    </div>
  );

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">
          Últimas <span className="text-orange-600">Novedades</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-widest">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{product.title}</h3>
                  <div className="flex items-center text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold ml-1">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block uppercase font-bold tracking-tighter">Precio</span>
                    <span className="text-2xl font-black text-gray-900">${product.price.toLocaleString()}</span>
                  </div>
                  
                  {/* Bouton connecté au CartContext */}
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-2xl shadow-lg shadow-orange-500/30 transition-all transform active:scale-90 hover:rotate-3"
                  >
                    <ShoppingCart className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;