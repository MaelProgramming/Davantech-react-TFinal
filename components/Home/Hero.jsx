import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gray-200 py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Navigation (Visual Only) */}
          <div className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer opacity-50 hover:opacity-100">
             <ChevronLeft className="w-12 h-12 text-gray-400 font-thin" strokeWidth={1} />
          </div>

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

          {/* Image */}
          <div className="md:w-6/12 flex justify-center relative">
             <img 
               src="https://www.google.com/aclk?sa=L&ai=DChsSEwjN89PVkLiRAxXGMAYAHXP6GsQYACICCAEQBBoCd3M&co=1&ase=2&gclid=CjwKCAiAl-_JBhBjEiwAn3rN7ZyQoBGrGNBoFjOPcWl75FvcaxJAnWKXK4mZ4xHuVihMP7l3StLrshoCYScQAvD_BwE&ei=NhU8aYbnMfLMkdUPrL_kmQQ&cid=CAASJeRoNca-bkSpujsgbbOULaVTKHmiVqiZCvoVFjOEowJMzwn7K7w&cce=2&category=acrcp_v1_32&sig=AOD64_1I4hKZWDxdrMA27JESoU8gLVaYQw&ctype=5&q=&nis=4&sqi=2&ved=2ahUKEwiG2s7VkLiRAxVyZqQEHawfOUMQ9aACKAB6BAgIEBY&adurl=" 
               alt="Samsung Galaxy S25 Ultra" 
               className="max-h-[500px] object-contain drop-shadow-2xl mix-blend-multiply"
             />
             {/* Stylized text overlay on image area as per design */}
             <div className="absolute top-1/2 right-0 md:right-10 -translate-y-1/2 pointer-events-none opacity-20 hidden lg:block">
                 <span className="text-9xl font-bold text-black writing-vertical rotate-180">Galaxy</span>
             </div>
          </div>

          {/* Right Navigation (Visual Only) */}
          <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer opacity-50 hover:opacity-100">
             <ChevronRight className="w-12 h-12 text-gray-400 font-thin" strokeWidth={1} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;