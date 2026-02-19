import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { db } from "../services/firebase";
import { collection, getDocs } from 'firebase/firestore';
import { Star, Loader2 } from 'lucide-react';

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Descargamos los datos de Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(docs);
      } catch (error) {
        console.error("Error al cargar Firebase:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 2. Filtramos los productos locales con la búsqueda de la URL
  const filteredProducts = products.filter(product => 
    product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin w-10 h-10 text-orange-600" />
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-black mb-10">
            {searchTerm ? `Resultados para: "${searchTerm}"` : 'Catálogo Completo'}
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-500 transition-all shadow-sm hover:shadow-xl">
                <div className="aspect-square p-6">
                  <img src={product.image} alt={product.title} className="w-full h-full object-contain transition-transform group-hover:scale-110" />
                </div>
                <div className="p-6 border-t border-gray-50">
                  <h3 className="font-bold text-xl">{product.title}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-black text-gray-900">{product.price}€</span>
                    <div className="flex items-center text-yellow-500 font-bold text-sm">
                       <Star className="w-4 h-4 fill-current mr-1" /> {product.rating}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
            <p className="text-gray-400 text-xl font-medium">No se encontró ningún "{searchTerm}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;