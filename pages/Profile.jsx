import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase'; 
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { User, Wallet, Package, Calendar, ChevronRight, LogOut, Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, userData, logout } = useAuth(); // 'user' contient l'ID d'auth, 'userData' les infos Firestore
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      // On utilise l'ID de l'objet 'user' (Firebase Auth) ou 'userData'
      const userId = user?.uid || userData?.uid;
      
      if (userId) {
        try {
          // Query sur 'orders' filtrée par userId et triée par date (plus récent en haut)
          // Note : Firestore peut te demander de créer un index dans la console pour le orderBy
          const ordersRef = collection(db, "orders");
          const q = query(
            ordersRef, 
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
          );

          const querySnapshot = await getDocs(q);
          const ordersData = querySnapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
          }));
          
          setOrders(ordersData);
        } catch (error) {
          console.error("Error al cargar pedidos:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user, userData]);

  // Fonction pour formater la date Firestore
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Reciente';
    const date = timestamp.toDate();
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header du Profil */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-tr from-orange-600 to-red-600 rounded-full flex items-center justify-center text-5xl font-black text-white shadow-lg uppercase">
              {userData?.username?.charAt(0) || <User size={48} />}
            </div>
            <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
          </div>

          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-black text-gray-900 mb-2 italic tracking-tighter uppercase">
              {userData?.username || 'Cargando...'}
            </h1>
            <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mb-4">Lead Developer Davantech</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-lg">
                <Wallet className="w-5 h-5 text-orange-500 mr-3" />
                <span className="font-black">{(userData?.balance || 0).toFixed(2)} €</span>
              </div>
              <button onClick={logout} className="flex items-center text-red-500 hover:bg-red-50 px-4 py-2 rounded-2xl transition-all font-black uppercase text-xs tracking-tighter">
                <LogOut className="w-5 h-5 mr-2" /> Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Historique des Commandes */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <h3 className="text-xl font-black text-gray-900 flex items-center uppercase tracking-tighter">
              <Package className="w-6 h-6 mr-3 text-orange-600" /> Historial de Pedidos
            </h3>
            <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              {orders.length} Pedidos
            </span>
          </div>

          <div className="divide-y divide-gray-50">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
              </div>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="p-8 hover:bg-gray-50/80 transition-all flex items-center justify-between group">
                  <div className="flex items-center space-x-6">
                    <div className="bg-gray-100 p-4 rounded-2xl group-hover:bg-orange-100 transition-colors">
                      <Calendar className="w-6 h-6 text-gray-400 group-hover:text-orange-600" />
                    </div>
                    <div>
                      <p className="font-black text-gray-900 uppercase text-sm tracking-tight">Pedido <span className="text-orange-600">#{order.id.slice(-6)}</span></p>
                      <p className="text-xs text-gray-400 font-bold">{formatDate(order.createdAt)}</p>
                      <p className="text-[10px] text-gray-500 mt-1 italic">{order.items?.length || 0} productos</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center">
                    <div className="mr-6">
                      <p className="font-black text-2xl text-gray-900 tracking-tighter">{order.total?.toFixed(2)}€</p>
                      <p className="text-[9px] font-black text-green-600 uppercase tracking-widest text-right">Pagado con Wallet</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-24">
                <Package className="w-20 h-20 text-gray-100 mx-auto mb-4" />
                <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No hay actividad en tu cuenta</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;