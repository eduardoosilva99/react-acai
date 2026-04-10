import React from 'react';

function Contato() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* CABEÇALHO */}
      <section className="text-center py-12 bg-white shadow-sm mb-8">
        <h1 className="text-4xl font-extrabold text-purple-700">Fale Conosco 💬</h1>
        <p className="text-gray-600 mt-4 text-lg">Estamos prontos para te atender!</p>
      </section>

      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        
        {/* INFORMAÇÕES DE CONTATO */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-md border border-purple-50">
            <h2 className="text-xl font-bold text-purple-800 mb-4">Canais de Atendimento</h2>
            
            <div className="space-y-4">
              <a 
                href="https://wa.me/5561999999999"
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 p-3 hover:bg-green-50 rounded-2xl transition-colors group"
              >
                <span className="text-3xl">🟢</span>
                <div>
                  <p className="font-bold text-gray-800 group-hover:text-green-600">WhatsApp</p>
                  <p className="text-sm text-gray-500">(61) 99999-9999</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3">
                <span className="text-3xl">📍</span>
                <div>
                  <p className="font-bold text-gray-800">Endereço</p>
                  <p className="text-sm text-gray-500">Cidade Ocidental - GO</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3">
                <span className="text-3xl">⏰</span>
                <div>
                  <p className="font-bold text-gray-800">Horário de Funcionamento</p>
                  <p className="text-sm text-gray-500">Todos os dias: 14:00 às 22:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-600 rounded-3xl p-8 text-white flex flex-col justify-center items-center text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Bateu aquela fome? 🍧</h2>
          <p className="mb-6 opacity-90">Não perca tempo, peça o melhor açaí da região agora mesmo pelo nosso catálogo!</p>
          <a 
            href="/cardapio" 
            className="bg-white text-purple-700 font-bold px-8 py-3 rounded-full hover:bg-purple-100 transition-all shadow-md"
          >
            Ver Cardápio
          </a>
        </div>

      </div>

      {/* MAPA */}
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <div className="bg-white p-6 rounded-3xl shadow-md border border-purple-50">
          <h2 className="text-xl font-bold text-purple-800 mb-4 text-center">Nossa Localização 📍</h2>
          <div className="aspect-video rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.2029783007356!2d-47.932537424863185!3d-16.106797484578106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93598570c198b6f7%3A0xc52be53584123673!2zQcOHQcONIERPIEJPQg!5e0!3m2!1spt-PT!2sbr!4v1774147781617!5m2!1spt-PT!2sbr"
              width="100%"
              height="100%"
              style={{border: 2}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Loja"
            ></iframe>
          </div>
          <p className="text-center text-gray-600 mt-4 text-sm">
            Venha nos visitar! Estamos localizados em Cidade Ocidental - GO
          </p>
        </div>
      </div>

    </div>
  );
}

export default Contato;
