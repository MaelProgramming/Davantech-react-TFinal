import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Star, ShoppingCart, ArrowLeft, Send } from 'lucide-react';


const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { user } = useAuth();

  // Local state for comments
  const [comments, setComments] = useState([
    { id: '1', user: 'TechReviewer', text: 'La calidad de la cámara en este dispositivo es absolutamente impresionante con poca luz.', date: '2023-11-12', rating: 5 },
    { id: '2', user: 'AndroidFan12', text: 'La batería está bien, pero desearía que cargara más rápido.', date: '2023-11-15', rating: 4 },
  ]);
  const [newComment, setNewComment] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-900">
        <div className="text-center">
           <h2 className="text-3xl font-bold mb-4">Producto no encontrado</h2>
           <Link to="/catalog" className="text-orange-600 hover:underline">Volver a la tienda</Link>
        </div>
      </div>
    );
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      user: user?.username || 'Invitado',
      text: newComment,
      date: new Date().toISOString().split('T')[0],
      rating: 5,
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        <Link to="/catalog" className="inline-flex items-center text-gray-500 hover:text-orange-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Catálogo
        </Link>

        {/* Product Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
            <img src={product.image} alt={product.title} className="w-full h-full object-contain p-8" />
          </div>
          
          <div className="flex flex-col justify-center">
             <div className="flex items-center space-x-4 mb-4">
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">{product.category}</span>
                <span className="text-gray-500 text-sm border-l border-gray-200 pl-4">{product.platform}</span>
             </div>
             
             <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{product.title}</h1>
             
             <div className="flex items-center mb-8">
               <div className="flex text-yellow-400 mr-4">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className={`w-6 h-6 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                 ))}
               </div>
               <span className="text-gray-600 text-lg">{product.rating} / 5</span>
             </div>

             <p className="text-gray-600 text-lg leading-relaxed mb-8">
               {product.description}
             </p>

             <div className="flex items-center justify-between border-t border-gray-100 pt-8 mt-auto">
               <span className="text-4xl font-bold text-gray-900">{product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
               <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold flex items-center shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95">
                 <ShoppingCart className="w-5 h-5 mr-2" /> Añadir al Carrito
               </button>
             </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Reseñas de Clientes</h3>
          
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
            <h4 className="text-gray-900 font-semibold mb-4">Escribe una reseña</h4>
            {user ? (
              <form onSubmit={handleAddComment}>
                <textarea 
                  className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg p-4 mb-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                  rows={3}
                  placeholder="Comparte tu experiencia..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <div className="flex justify-end">
                   <button type="submit" className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center">
                      <Send className="w-4 h-4 mr-2" /> Publicar Reseña
                   </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 bg-white rounded-lg border border-gray-200 border-dashed">
                <p className="text-gray-500 mb-2">Por favor inicia sesión para dejar una reseña.</p>
                <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium">Ir a Login</Link>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                   <div className="flex items-center">
                     <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3">
                       {comment.user.charAt(0).toUpperCase()}
                     </div>
                     <span className="font-semibold text-gray-900">{comment.user}</span>
                   </div>
                   <span className="text-xs text-gray-400">{comment.date}</span>
                </div>
                <div className="flex text-yellow-400 mb-2 w-20">
                    {[...Array(5)].map((_, i) => (
                       <Star key={i} className={`w-3 h-3 ${i < comment.rating ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                </div>
                <p className="text-gray-600">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;