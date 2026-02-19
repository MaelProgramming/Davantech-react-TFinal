import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  // On récupère userData qui contient le username et les credits de Firestore
  const { user, userData, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-white py-4 sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex justify-between items-center w-full md:w-auto">
            <Link to="/home" className="flex items-center space-x-2">
              <div className="flex flex-col items-start leading-none">
                 <div className="flex space-x-0.5 mb-0.5">
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-1 rounded-sm">mi</span>
                    <span className="bg-blue-800 text-white text-[10px] font-bold px-1 rounded-sm">SAMSUNG</span>
                    <span className="bg-gray-500 text-white text-[10px] font-bold px-1 rounded-sm">Apple</span>
                 </div>
                 <span className="text-2xl font-black text-gray-800 tracking-tight">DAVAN<span className="text-gray-600">TECH</span></span>
              </div>
            </Link>

            <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className="w-full md:max-w-md relative order-3 md:order-2">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Buscar productos..." 
                    className="w-full bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-full py-2.5 pl-10 pr-4 outline-none transition-all text-sm"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className={`md:flex items-center space-x-6 order-2 md:order-3 w-full md:w-auto ${isMenuOpen ? 'flex flex-col mt-4 space-y-4' : 'hidden'}`}>
            <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 font-semibold text-gray-700">
                <Link to="/home" className={`hover:text-orange-600 ${location.pathname === '/home' ? 'text-orange-600' : ''}`}>Inicio</Link>
                <Link to="/catalog" className={`hover:text-orange-600 ${location.pathname === '/catalog' ? 'text-orange-600' : ''}`}>Catalogo</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
                {user ? (
                   <div className="flex items-center bg-gray-50 rounded-full pl-2 pr-4 py-1 border border-gray-100">
                       <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold mr-2 text-xs">
                         {userData?.username?.charAt(0).toUpperCase() || 'U'}
                       </div>
                       <div className="flex flex-col">
                         <span className="text-sm font-bold text-gray-900 leading-tight">
                            {userData?.username || 'Cargando...'}
                         </span>
                         <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-tighter">
                               {userData?.credits || 0} Créditos
                            </span>
                            <button onClick={handleLogout} className="text-[10px] text-red-500 hover:underline">Salir</button>
                         </div>
                       </div>
                   </div>
                ) : (
                    <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-orange-600 px-2">Login</Link>
                )}
                
                <Link 
                  to="/cart" 
                  className="bg-orange-600 hover:bg-orange-700 text-white p-2.5 rounded-full transition-all relative"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-blue-800 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    0
                  </span>
                </Link>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;