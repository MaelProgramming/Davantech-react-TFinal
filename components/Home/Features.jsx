import React from 'react';
import { Cpu, Home, Sparkles } from 'lucide-react';

const Features = () => {
  const features = [
    {
      img: "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?auto=format&fit=crop&q=80&w=800",
      title: "La mejor potencia del mercado",
      desc: "Experiencia la mayor potencia nunca antes vista en un smartphone con el SnapDragon Elite for Galaxy."
    },
    {
      img: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800",
      title: "Sientete como en casa",
      desc: "Con OneUI y Android 16, siente la mejor experiencia hacia Usuario de cualquier android."
    },
    {
      img: "../img/twitter-1.png",
      title: "La mejor IA del mercado",
      desc: "Aprovecha el mejor Galaxy AI para usar todo el potencial de la inteligencia Artificial."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12">Conoce la bestia coreana</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-6 h-64 shadow-md hover:shadow-xl transition-shadow">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;