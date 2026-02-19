import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import { Apple } from 'lucide-react';

// Subcomponents defined here for simplicity of the request, 
// in a larger app they would be in separate files.

const BrandStrips = () => (
  <div className="flex w-full h-24 md:h-32">
    <div className="w-1/3 bg-blue-800 flex items-center justify-center relative overflow-hidden group">
       <span className="text-3xl md:text-4xl font-bold text-white z-10 group-hover:scale-110 transition-transform">SAMSUNG</span>
    </div>
    <div className="w-1/3 bg-orange-600 flex items-center justify-center relative overflow-hidden group">
       <span className="text-3xl md:text-4xl font-bold text-white z-10 bg-orange-500 px-2 rounded group-hover:scale-110 transition-transform">mi</span>
    </div>
    <div className="w-1/3 bg-gray-400 flex items-center justify-center relative overflow-hidden group">
       <Apple className="w-12 h-12 md:w-16 md:h-16 text-white z-10 group-hover:scale-110 transition-transform" fill="currentColor" />
    </div>
  </div>
);

const BrandInfo = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">Las Mejores Marcas</h2>
      
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Samsung</h3>
            <p className="text-gray-500 text-sm">Multinacional surcoreana destacada por su amplia gama de productos electrónicos y su innovación en pantallas y móviles.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-orange-600 mb-2">Xiaomi</h3>
            <p className="text-gray-500 text-sm">Marca china reconocida por ofrecer tecnología innovadora y de buena calidad a precios competitivos.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-500 mb-2">Apple</h3>
            <p className="text-gray-500 text-sm">Empresa estadounidense líder en diseño, innovación y ecosistema premium de dispositivos y servicios.</p>
          </div>
          
          <Link to="/catalog">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-8 py-3 rounded-md mt-4 transition-colors">
              Ver Catalogo
            </button>
          </Link>
        </div>
        
        <div className="lg:w-1/2 bg-gray-100 rounded-xl overflow-hidden shadow-lg p-8 flex items-center justify-center">
            {/* Placeholder for the 3 phones image */}
            <img 
              src="https://images.unsplash.com/photo-1616353071855-2c045c4458ae?auto=format&fit=crop&q=80&w=800" 
              alt="Brand Showcase" 
              className="w-full object-cover hover:scale-105 transition-transform duration-700"
            />
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-16 bg-white border-t border-gray-100">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">Opiniones</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            quote: "“Encantado, todo correcto y envio puntual”",
            name: "Marques Brownlee",
            device: "iPhone 17 pro",
            img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150"
          },
          {
            quote: "“Todo al mejor precio”",
            name: "Dana",
            device: "Xiaomi 15 Ultra",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
          },
          {
            quote: "“Encantado con el servicio, 10/10”",
            name: "Mrwhosetheboss",
            device: "Samsung Galaxy S25 Ultra",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
          }
        ].map((t, i) => (
          <div key={i} className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-black mb-8 leading-tight">{t.quote}</h3>
            <div className="flex items-center mt-auto">
              <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover mr-4" />
              <div>
                <p className="text-sm font-bold text-black">{t.name}</p>
                <p className="text-xs text-gray-500">{t.device}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutContact = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });

  return (
    <section id="about" className="py-16 bg-white">
       <div className="container mx-auto px-4">
         <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Sobre nosotros</h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              En Davantech, somos apasionados por la tecnología y nos especializamos en ofrecer los mejores smartphones de las marcas más reconocidas: Apple, Xiaomi y Samsung.<br/>
              Nuestro objetivo es brindarte productos de calidad, con los mejores precios y un servicio de atención al cliente cercano y confiable.<br/>
              Creemos que la innovación debe estar al alcance de todos, por eso trabajamos cada día para que encuentres el móvil ideal para ti, de forma rápida, segura y con total confianza.
            </p>
         </div>

         <div className="max-w-2xl">
           <h2 className="text-2xl font-bold text-black mb-6">Contáctanos</h2>
           <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-1">Primer nombre</label>
               <input type="text" placeholder="Jane" className="w-full border border-gray-200 rounded-md p-3 text-sm focus:outline-none focus:border-orange-500" />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-1">Apellidos</label>
               <input type="text" placeholder="Smitherton" className="w-full border border-gray-200 rounded-md p-3 text-sm focus:outline-none focus:border-orange-500" />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-1">Correo electronico</label>
               <input type="email" placeholder="email@janesfakedomain.net" className="w-full border border-gray-200 rounded-md p-3 text-sm focus:outline-none focus:border-orange-500" />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-1">Tu mensaje</label>
               <textarea placeholder="Enter your question or message" rows={4} className="w-full border border-gray-200 rounded-md p-3 text-sm focus:outline-none focus:border-orange-500"></textarea>
             </div>
             
             <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-10 py-3 rounded-md mt-2 transition-colors">
               Enviar
             </button>
           </form>
         </div>
       </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen">
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