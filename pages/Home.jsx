import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import { Apple, Database } from 'lucide-react'; // Ajout de Database pour le bouton sync
import { uploadProductsToFirebase } from '../utils/seed'; // Ton script de synchro

const BrandStrips = () => (
  <div className="flex w-full h-24 md:h-32 border-b border-gray-100">
    <div className="w-1/3 bg-[#034EA2] flex items-center justify-center relative overflow-hidden group">
       <span className="text-2xl md:text-4xl font-black text-white z-10 group-hover:scale-110 transition-transform duration-500 tracking-tighter">SAMSUNG</span>
    </div>
    <div className="w-1/3 bg-[#FF6700] flex items-center justify-center relative overflow-hidden group border-x border-white/10">
       <span className="text-3xl md:text-5xl font-bold text-white z-10 bg-white/20 px-3 py-1 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">mi</span>
    </div>
    <div className="w-1/3 bg-[#555555] flex items-center justify-center relative overflow-hidden group">
       <Apple className="w-12 h-12 md:w-16 md:h-16 text-white z-10 group-hover:scale-110 transition-transform duration-500" fill="currentColor" />
    </div>
  </div>
);

const BrandInfo = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-black text-gray-900 mb-16 tracking-tight">Las Mejores <span className="text-orange-600">Marcas</span></h2>
      
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 space-y-10">
          <div className="group">
            <h3 className="text-2xl font-black text-blue-900 mb-2 border-l-4 border-blue-900 pl-4">Samsung</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Innovación líder en pantallas plegables y fotografía móvil de alta gama.</p>
          </div>
          <div className="group">
            <h3 className="text-2xl font-black text-orange-600 mb-2 border-l-4 border-orange-600 pl-4">Xiaomi</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Tecnología de vanguardia con la mejor relación calidad-precio del mercado.</p>
          </div>
          <div className="group">
            <h3 className="text-2xl font-black text-gray-800 mb-2 border-l-4 border-gray-800 pl-4">Apple</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Diseño icónico y el ecosistema más fluido y seguro del mundo tech.</p>
          </div>
          
          <Link to="/catalog" className="inline-block">
            <button className="bg-gray-900 hover:bg-orange-600 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95">
              Ver Catálogo Completo
            </button>
          </Link>
        </div>
        
        <div className="lg:w-1/2 bg-gray-50 rounded-[3rem] overflow-hidden shadow-inner p-12 flex items-center justify-center border border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1616353071855-2c045c4458ae?auto=format&fit=crop&q=80&w=800" 
              alt="Brand Showcase" 
              className="w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-20 bg-gray-50 border-y border-gray-100">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-black text-gray-900 mb-16 tracking-tight">Opiniones de la <span className="text-orange-600">Comunidad</span></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            quote: "“Encantado, todo correcto y envio puntual”",
            name: "Marques Brownlee",
            device: "iPhone 17 pro",
            img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150"
          },
          {
            quote: "“Todo al mejor precio en Davantech”",
            name: "Dana",
            device: "Xiaomi 15 Ultra",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
          },
          {
            quote: "“El mejor servicio, 10/10 siempre”",
            name: "Mrwhosetheboss",
            device: "Samsung Galaxy S25 Ultra",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
          }
        ].map((t, i) => (
          <div key={i} className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
            <h3 className="text-xl font-bold text-gray-900 mb-8 italic leading-snug group-hover:text-orange-600 transition-colors">{t.quote}</h3>
            <div className="flex items-center">
              <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full border-4 border-gray-50 object-cover mr-4 shadow-sm" />
              <div>
                <p className="text-sm font-black text-gray-900">{t.name}</p>
                <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{t.device}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutContact = () => {
  return (
    <section id="about" className="py-20 bg-white">
       <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20">
         <div>
            <h2 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Sobre <span className="text-orange-600">Nosotros</span></h2>
            <p className="text-gray-500 font-medium leading-loose text-lg mb-6">
              En <span className="text-gray-900 font-black">Davantech</span>, somos apasionados por la tecnología y nos especializamos en ofrecer los mejores smartphones de las marcas más reconocidas.
            </p>
            <p className="text-gray-500 font-medium leading-loose text-lg">
              Creemos que la innovación debe estar al alcance de todos. Por eso, trabajamos cada día para que encuentres el móvil ideal para ti de forma rápida y segura.
            </p>
         </div>

         <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 shadow-inner">
           <h2 className="text-2xl font-black text-gray-900 mb-8">Escríbenos</h2>
           <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
             <div className="grid grid-cols-2 gap-4">
               <input type="text" placeholder="Nombre" className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
               <input type="text" placeholder="Apellidos" className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
             </div>
             <input type="email" placeholder="Email" className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
             <textarea placeholder="¿En qué podemos ayudarte?" rows={4} className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"></textarea>
             <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98]">
               Enviar Mensaje
             </button>
           </form>
         </div>
       </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <BrandStrips />
      <Hero />
      <Features />
      <BrandInfo />
      <Testimonials />
      <AboutContact />

    </div>
  );
};

export default Home;