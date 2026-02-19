import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
           {/* Logo */}
            <Link to="/home" className="flex items-center space-x-2 group mb-6 md:mb-0">
              <div className="flex flex-col items-start leading-none">
                 <div className="flex space-x-0.5 mb-0.5">
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-1 rounded-sm">mi</span>
                    <span className="bg-blue-800 text-white text-[10px] font-bold px-1 rounded-sm">SAMSUNG</span>
                    <span className="bg-gray-500 text-white text-[10px] font-bold px-1 rounded-sm"></span>
                 </div>
                 <span className="text-2xl font-black text-gray-800 tracking-tight">DAVAN<span className="text-gray-600">TECH</span></span>
              </div>
            </Link>

            <nav className="flex flex-col md:flex-row gap-6 text-sm font-medium text-gray-600">
                <Link to="/home" className="hover:text-orange-600">Inicio</Link>
                <Link to="/catalog" className="hover:text-orange-600">Catalogo</Link>
                <a href="#about" className="hover:text-orange-600">Sobre Nosotros</a>
                <a href="#" className="hover:text-orange-600">Carrito</a>
            </nav>
        </div>
        
        <div className="flex justify-between items-center border-t border-gray-100 pt-8">
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-gray-600 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gray-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gray-600 transition-colors"><Youtube className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gray-600 transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
            <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Davantech. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;