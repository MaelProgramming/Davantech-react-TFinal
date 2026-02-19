import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
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
            
            <button className="bg-blue-800 hover:bg-blue-900 text-white text-lg font-medium px-10 py-3 rounded-lg shadow-lg transition-transform active:scale-95">
              Comprar ahora
            </button>
          </div>

          <div className="md:w-6/12 flex justify-center relative">
             <img 
               src="../img/fee_786_587_png.webp" 
               alt="Samsung Galaxy S25 Ultra" 
               className="max-h-[500px] object-contain drop-shadow-2xl mix-blend-multiply"
             />
          </div>

  
        </div>
      </div>
    </section>
  );
};

export default Hero;