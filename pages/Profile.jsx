import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase'; // Ruta verificada según tu carpeta services
import { collection, query, where, getDocs } from 'firebase/firestore';
import { User, Wallet, Package, Calendar, ChevronRight, LogOut } from 'lucide-react';

const Profile = () => {
  const { userData, logout } = useAuth(); // Obtenemos datos reales: username y credits
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulación de carga de pedidos desde Firebase
  useEffect(() => {
    const fetchOrders = async () => {
      if (userData?.uid) {
        try {
          // Aquí buscaríamos en la colección 'orders' donde el userId coincida
          const q = query(collection(db, "orders"), where("userId", "==", userData.uid));
          const querySnapshot = await getDocs(q);
          const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setOrders(ordersData);
        } catch (error) {
          console.error("Error al cargar pedidos:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [userData]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header del Perfil: Nombre, Saldo y Foto */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-5xl font-black text-white shadow-lg">
              {userData?.username?.charAt(0).toUpperCase() || <User size={48} />}
            </div>
            <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
          </div>

          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              {userData?.username || 'Cargando...'}
            </h1>
            <p className="text-gray-500 font-medium mb-4">Cliente Premium Davantech</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="flex items-center bg-orange-50 px-4 py-2 rounded-2xl border border-orange-100">
                <Wallet className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-orange-700 font-bold">{userData?.credits || 0} Créditos</span>
              </div>
              <button onClick={logout} className="flex items-center text-red-500 hover:bg-red-50 px-4 py-2 rounded-2xl transition-colors font-semibold">
                <LogOut className="w-5 h-5 mr-2" /> Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Sección de Pedidos */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Package className="w-6 h-6 mr-2 text-blue-600" /> Historial de Pedidos
            </h3>
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
              {orders.length} Realizados
            </span>
          </div>

          <div className="divide-y divide-gray-50">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-3 rounded-xl group-hover:bg-blue-100 transition-colors">
                      <Calendar className="w-6 h-6 text-gray-500 group-hover:text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Pedido #{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-gray-500">{order.date || 'Reciente'}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center">
                    <div className="mr-6">
                      <p className="font-black text-lg text-gray-900">{order.total}€</p>
                      <p className="text-[10px] font-bold text-green-600 uppercase">Completado</p>
                    </div>
                    <ChevronRight className="text-gray-300" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 font-medium italic">Aún no has realizado ninguna compra</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;