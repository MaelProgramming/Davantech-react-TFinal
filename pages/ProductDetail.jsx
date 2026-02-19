import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // Ne pas oublier !
import { Star, ShoppingCart, ArrowLeft, Send } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { user, userData } = useAuth(); // On récupère userData pour le pseudo
  const { addToCart } = useCart();

  const [comments, setComments] = useState([
    { id: '1', user: 'TechReviewer', text: 'La calidad de la cámara es impresionante.', date: '2023-11-12', rating: 5 },
    { id: '2', user: 'AndroidFan12', text: 'La batería está bien, pero podría cargar más rápido.', date: '2023-11-15', rating: 4 },
  ]);
  const [newComment, setNewComment] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Producto no encontrado</h2>
          <Link to="/catalog" className="text-orange-600 hover:underline font-bold">Volver a la tienda</Link>
        </div>
      </div>
    );
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      user: userData?.username || user?.email?.split('@')[0] || 'Invitado', // On utilise le vrai pseudo de Firestore
      text: newComment,
      date: new Date().toISOString().split('T')[0],
      rating: 5,
    };

    setComments([comment, ...comments]); // Nouveau commentaire en haut, c'est mieux pour l'UX
    setNewComment('');
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        <Link to="/catalog" className="inline-flex items-center text-gray-500 hover:text-orange-600 mb-8 transition-all font-semibold">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Catálogo
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 flex items-center justify-center p-12">
            <img src={product.image} alt={product.title} className="max-h-[500px] object-contain hover:scale-105 transition-transform duration-500" />
          </div>
          
          {/* Info */}
          <div className="flex flex-col">
             <div className="flex items-center space-x-3 mb-4">
                <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">{product.category}</span>
                <span className="text-gray-400 text-sm font-bold uppercase tracking-tighter">{product.platform}</span>
             </div>
             
             <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">{product.title}</h1>
             
             <div className="flex items-center mb-8 bg-gray-50 self-start px-4 py-2 rounded-2xl border border-gray-100">
               <div className="flex text-orange-500 mr-3">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                 ))}
               </div>
               <span className="font-bold text-gray-900">{product.rating}</span>
             </div>

             <p className="text-gray-600 text-xl leading-relaxed mb-10 italic border-l-4 border-orange-500 pl-6">
               "{product.description}"
             </p>

             <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100 pt-8">
               <div className="flex flex-col">
                 <span className="text-gray-400 text-xs font-bold uppercase">Precio Final</span>
                 <span className="text-5xl font-black text-gray-900">${product.price.toLocaleString()}</span>
               </div>
               
               <button 
                 onClick={() => addToCart(product)}
                 className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center shadow-xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
               >
                 <ShoppingCart className="w-6 h-6 mr-3" /> Añadir al Carrito
               </button>
             </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="max-w-3xl mx-auto border-t border-gray-100 pt-16">
          <h3 className="text-3xl font-black text-gray-900 mb-10">Reseñas <span className="text-orange-600">Davantech</span></h3>
          
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-12">
            {user ? (
              <form onSubmit={handleAddComment}>
                <textarea 
                  className="w-full bg-white text-gray-900 border-2 border-gray-100 rounded-2xl p-5 mb-4 focus:border-orange-500 outline-none resize-none transition-all font-medium"
                  rows={3}
                  placeholder={`¿Qué te parece este ${product.title}, ${userData?.username || 'Mael'}?`}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <div className="flex justify-end">
                   <button type="submit" className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center shadow-lg">
                      <Send className="w-4 h-4 mr-2" /> Publicar
                   </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 text-gray-500 font-bold">
                🔒 Inicia sesión para comentar.
              </div>
            )}
          </div>

          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-orange-200 transition-colors">
                <div className="flex justify-between items-center mb-4">
                   <div className="flex items-center">
                     <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-black text-sm mr-3">
                       {comment.user.charAt(0).toUpperCase()}
                     </div>
                     <span className="font-black text-gray-900">{comment.user}</span>
                   </div>
                   <span className="text-[10px] font-bold text-gray-300 uppercase">{comment.date}</span>
                </div>
                <p className="text-gray-600 font-medium leading-relaxed">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;