import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, Menu, X, Search, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';


const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white py-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Top Row for Mobile / Left Side for Desktop */}
          <div className="flex justify-between items-center w-full md:w-auto">
            {/* Logo */}
            <Link to="/home" className="flex items-center space-x-2 group">
              {/* Approximating the logo style from image */}
              <div className="flex flex-col items-start leading-none">
                 <div className="flex space-x-0.5 mb-0.5">
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-1 rounded-sm">mi</span>
                    <span className="bg-blue-800 text-white text-[10px] font-bold px-1 rounded-sm">SAMSUNG</span>
                    <span className="bg-gray-500 text-white text-[10px] font-bold px-1 rounded-sm">Apple</span>
                 </div>
                 <span className="text-2xl font-black text-gray-800 tracking-tight">DAVAN<span className="text-gray-600">TECH</span></span>
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Search Bar - Centered */}
          <div className="w-full md:max-w-md relative order-3 md:order-2">
            <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Menu className="h-4 w-4 text-gray-500" />
                </div>
                <input 
                    type="text" 
                    placeholder="Buscar productos" 
                    className="w-full bg-gray-300/50 text-gray-800 rounded-full py-2.5 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-600" />
                </div>
            </div>
          </div>

          {/* Nav & Actions - Right */}
          <div className={`md:flex items-center space-x-6 order-2 md:order-3 w-full md:w-auto ${isMenuOpen ? 'flex flex-col space-y-4 pb-4' : 'hidden'}`}>
            <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 font-semibold text-gray-900">
                <Link to="/home" className="hover:text-orange-600 transition-colors">Inicio</Link>
                <Link to="/catalog" className="hover:text-orange-600 transition-colors">Catalogo</Link>
                <a href="#about" className="hover:text-orange-600 transition-colors">Sobre Nosotros</a>
            </nav>
            
            <div className="flex items-center space-x-4">
                {user ? (
                   <div className="flex items-center space-x-2">
                       <span className="text-sm font-medium">Hola, {user.username}</span>
                       <button onClick={logout} className="text-xs text-red-500 underline">Salir</button>
                   </div>
                ) : (
                    <Link to="/login" className="text-sm font-medium hover:text-orange-600">Login</Link>
                )}
                
                <Link 
  to="/cart" 
  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md font-bold transition-colors shadow-sm flex items-center"
>
  Carrito
</Link>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;