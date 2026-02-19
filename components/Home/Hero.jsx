import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const productId = "s25-ultra";
  return (
    <section className="relative bg-gray-200 py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          

          {/* Content */}
          <div className="md:w-5/12 pl-4 md:pl-12">
            <h2 className="text-sm font-bold tracking-widest text-gray-600 uppercase mb-2">SAMSUNG S25 ULTRA</h2>
            <p className="text-gray-800 text-lg leading-relaxed mb-8 font-medium">
              El Samsung Galaxy S25 Ultra es el modelo insignia de la serie S de 2025, lanzado en enero de ese mismo año. Destaca por su hardware potente, un sistema de cámaras avanzado y una experiencia de software optimizada con Inteligencia Artificial (IA).
            </p>
            
            <p className="text-2xl font-bold text-gray-900 mb-8">1.500 €</p>
            
           <Link 
              to={`/product/${productId}`} 
              className="inline-block bg-blue-800 hover:bg-blue-900 text-white text-lg font-medium px-10 py-3 rounded-lg shadow-lg transition-transform active:scale-95"
            >
              Comprar ahora
            </Link>
          </div>

          <div className="md:w-6/12 flex justify-center relative p-8 bg-gradient-to-b from-transparent to-gray-50/50 rounded-3xl">
          {/* Effet de halo derrière le téléphone pour le faire ressortir */}
          <div className="absolute inset-0 bg-orange-500/5 blur-[120px] rounded-full transform scale-75"></div>
            <img 
              src="https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_149355015/fee_786_587_png" 
              alt="Samsung Galaxy S25 Ultra" 
              className="relative z-10 max-h-[500px] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          </div>
      </div>
    </section>
  );
};

export default Hero;