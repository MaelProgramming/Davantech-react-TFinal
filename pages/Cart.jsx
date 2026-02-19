import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; 
import { Link } from 'react-router-dom';

const Cart = () => {
  const { user } = useAuth(); 
  
  // Extraemos lo necesario del contexto global
  const { cart, totalPrice, removeFromCart } = useCart();

  // BORRAMOS la línea de "const total = cartItems..." que causaba el error

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Tu Carrito</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-4">
          {cart.length > 0 ? ( 
            cart.map((item) => (
              <div key={item.id} className="flex items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain rounded-lg" />
                <div className="ml-4 flex-grow">
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-gray-500">{item.price}€ x {item.quantity}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="text-red-500 text-xs hover:underline mt-1"
                  >
                    Eliminar
                  </button>
                </div>
                <div className="text-right font-bold text-blue-600">
                  {(item.price * item.quantity).toFixed(2)}€
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-xl shadow-inner">
              <p className="text-gray-400 text-xl">El carrito está vacío</p>
            </div>
          )}
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-6">
            <h2 className="text-xl font-bold mb-4">Resumen</h2>
            <div className="flex justify-between mb-6 text-xl font-bold border-t pt-4">
              <span>Total</span>
              {/* Usamos directamente totalPrice del contexto */}
              <span className="text-blue-600">{totalPrice.toFixed(2)}€</span> 
            </div>

            {user ? (
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95">
                Finalizar Compra
              </button>
            ) : (
              <div className="text-center">
                <p className="text-sm text-red-500 mb-4 font-medium italic">Debes estar logueado para comprar</p>
                <Link to="/login" className="block w-full bg-gray-800 text-white font-bold py-3 rounded-xl text-center transition-colors hover:bg-gray-900">
                  Ir al Login
                </Link>
              </div>
            )}
            
            <Link to="/catalog" className="block text-center mt-4 text-sm text-gray-500 hover:text-blue-600 underline transition-colors">
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;