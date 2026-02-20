import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; 
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, CreditCard, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { user, userData } = useAuth(); 
  const { cart, totalPrice, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Solde récupéré via le context (Firestore onSnapshot idéalement)
  const userBalance = userData?.balance || 0;

  const handleCheckout = async () => {
    if (!user) return navigate('/login');
    
    // Check UX rapide avant de trigger le serveur
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
      <h1 className="text-4xl font-black mb-8 text-gray-900 tracking-tighter italic uppercase">Tu Carrito</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LISTE DES PRODUITS */}
        <div className="lg:w-2/3 space-y-4">
          {cart.length > 0 ? ( 
            cart.map((item) => (
              <div key={item.id} className="flex items-center bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 group">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-contain rounded-lg group-hover:scale-110 transition-transform" />
                <div className="ml-6 flex-grow">
                  <h2 className="font-black text-xl text-gray-800">{item.title}</h2>
                  <p className="text-gray-400 font-bold">{item.price.toFixed(2)}€ <span className="text-xs">x {item.quantity}</span></p>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="text-red-500 text-xs font-black uppercase tracking-widest mt-2 hover:text-red-700 transition-colors"
                  >
                    Eliminar
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
              <p className="text-gray-400 text-xl font-bold">Tu carrito está vacío</p>
              <Link to="/catalog" className="mt-4 inline-block text-orange-600 font-black hover:underline">Ir a la tienda</Link>
            </div>
          )}
        </div>

        {/* RÉSUMÉ ET PAIEMENT */}
        <div className="lg:w-1/3">
          <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl text-white sticky top-24 border border-white/10">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter">Resumen</h2>
            
            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400 font-bold">
                    <span>Subtotal</span>
                    <span>{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-400 font-bold">
                    <span>Envío</span>
                    <span className="text-green-500">GRATIS</span>
                </div>
                <div className="flex justify-between text-blue-200 font-bold text-sm pt-4 border-t border-white/10">
                    <span>Tu Saldo Actual</span>
                    <span className={userBalance < totalPrice ? 'text-red-500' : 'text-orange-500'}>
                        {userBalance.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </span>
                </div>
            </div>

            <div className="flex justify-between mb-8 text-3xl font-black pt-4 border-t border-white/20">
              <span>Total</span>
              <span className="text-orange-600">{totalPrice.toFixed(2)}€</span> 
            </div>

            {user ? (
              <button 
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Pagar con Wallet</span>
                  </>
                )}
              </button>
            ) : (
              <div className="text-center">
                <p className="text-sm text-red-400 mb-4 font-bold italic uppercase tracking-widest">Login requerido</p>
                <Link to="/login" className="block w-full bg-white text-gray-900 font-black py-4 rounded-2xl text-center transition-transform hover:scale-[1.02]">
                  Ir al Login
                </Link>
              </div>
            )}
            
            <Link to="/catalog" className="block text-center mt-6 text-xs text-gray-500 hover:text-white font-bold uppercase tracking-widest transition-colors">
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;