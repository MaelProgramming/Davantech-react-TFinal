import React from "react";

function AboutContact() {
  return (
    <div className="w-full px-6 py-10 flex flex-col gap-16 md:flex-row md:items-start md:justify-between">
      {/* About Section */}
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-4xl font-bold">Sobre nosotros</h1>
        <p>
          En Davantech, somos apasionados por la tecnología y nos especializamos
          en ofrecer los mejores smartphones de las marcas más reconocidas:
          Apple, Xiaomi y Samsung.
        </p>
        <p>
          Nuestro objetivo es brindarte productos de calidad, con los mejores
          precios y un servicio de atención al cliente cercano y confiable.
        </p>
        <p>
          Creemos que la innovación debe estar al alcance de todos, por eso
          trabajamos cada día para que encuentres el móvil ideal para ti, de
          forma rápida, segura y con total confianza.
        </p>
      </div>

      {/* Contact Form */}
      <div className="md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Contáctanos</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Primer nombre</label>
            <input
              type="text"
              placeholder="Jane"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Apellidos</label>
            <input
              type="text"
              placeholder="Smitherton"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="email@janesfakedomain.net"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tu mensaje</label>
            <textarea
              placeholder="Enter your question or message"
              className="w-full border rounded-lg px-3 py-2 h-32 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
export default AboutContact 

