import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; 
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
// Ajout de collection, addDoc et serverTimestamp pour la table 'orders'
import { doc, updateDoc, increment, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Loader2, CreditCard, ShoppingBag, Trash2 } from 'lucide-react';

const Cart = () => {
  const { user, userData } = useAuth(); 
  const { cart, totalPrice, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // On utilise exclusivement balance
  const userBalance = userData?.balance || 0;

  const handleCheckout = async () => {
    if (!user) return navigate('/login');
    
    // Check de sécurité : si le mec essaie de forcer sans thunes
    if (userBalance < totalPrice) {
      alert(`⚠️ Fondos insuficientes. Necesitas ${(totalPrice - userBalance).toFixed(2)}€ más.`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://pay-api-davantech.vercel.app/api/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: user.uid, // On envoie bien l'UID
          amount: totalPrice 
        }),
      });

      const data = await response.json();

      // On check si la réponse est OK (status 200) et si le flag success est là
      if (response.ok && data.success) {
        clearCart();
        alert("🎉 ¡Compra realizada con éxito! Tu saldo ha sido actualizado.");
        navigate('/home');
      } else {
        // On remonte l'erreur précise du serveur (ex: "Sueldo demasiado bajo")
        throw new Error(data.error || "Error en el servidor de pagos");
      }
    } catch (error) {
      console.error("Error al procesar compra:", error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-black mb-8 text-gray-900 tracking-tighter italic">TU CARRITO</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LISTE DES PRODUITS */}
        <div className="lg:w-2/3 space-y-4">
          {cart.length > 0 ? ( 
            cart.map((item) => (
              <div key={item.id} className="flex items-center bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 group transition-all hover:shadow-md">
                <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                
                <div className="ml-6 flex-grow">
                  <h2 className="font-black text-xl text-gray-800 uppercase tracking-tight">{item.title}</h2>
                  <p className="text-gray-400 font-bold">
                    {item.price.toFixed(2)}€ <span className="text-xs text-orange-500">x {item.quantity}</span>
                  </p>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="flex items-center space-x-1 text-red-500 text-[10px] font-black uppercase tracking-widest mt-3 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Eliminar producto</span>
                  </button>
                </div>

                <div className="text-right font-black text-2xl text-gray-900">
                  {(item.price * item.quantity).toFixed(2)}€
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400 text-xl font-bold italic text-orange-600">TU CARRITO ESTÁ VACÍO</p>
              <Link to="/catalog" className="mt-4 inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-black hover:bg-orange-600 transition-colors">
                IR A LA TIENDA
              </Link>
            </div>
          )}
        </div>

        {/* RÉSUMÉ ET PAIEMENT */}
        <div className="lg:w-1/3">
          <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl text-white sticky top-24 border border-white/10">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter text-orange-500">Resumen de Pago</h2>
            
            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400 font-bold">
                    <span>Subtotal</span>
                    <span>{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-400 font-bold">
                    <span>Gastos de envío</span>
                    <span className="text-green-500 font-black">FREE</span>
                </div>
                
                {/* AFFICHAGE DU SOLDE WALLET */}
                <div className="flex justify-between items-center text-blue-200 font-bold text-sm pt-4 border-t border-white/10">
                    <span className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" /> Mi Wallet
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs ${userBalance < totalPrice ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {userBalance.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </span>
                </div>
            </div>

            <div className="flex justify-between mb-8 text-4xl font-black pt-4 border-t border-white/20 tracking-tighter">
              <span>TOTAL</span>
              <span className="text-orange-600">{totalPrice.toFixed(2)}€</span> 
            </div>

            {user ? (
              <button 
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-800 disabled:text-gray-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-3 group"
              >
                {loading ? <Loader2 className="animate-spin w-6 h-6" /> : (
                  <>
                    <ShoppingBag className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    <span className="text-lg">CONFIRMAR PEDIDO</span>
                  </>
                )}
              </button>
            ) : (
              <div className="text-center">
                <p className="text-sm text-red-400 mb-4 font-black uppercase tracking-widest">Identificación necesaria</p>
                <Link to="/login" className="block w-full bg-white text-gray-900 font-black py-4 rounded-2xl text-center transition-transform hover:scale-[1.02]">
                  INICIAR SESIÓN
                </Link>
              </div>
            )}
            
            <Link to="/catalog" className="block text-center mt-6 text-[10px] text-gray-500 hover:text-orange-500 font-black uppercase tracking-[0.2em] transition-colors">
              ← Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;