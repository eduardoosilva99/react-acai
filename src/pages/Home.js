// Importações do Swiper e Router
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";

// Importações dos estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  // Lista de produtos exclusiva da Home
  const produtos = [
    { id: 1, nome: "Açaí Tradicional", preco: "R$ 15,00", img: "https://bhacaiesorvetesmc.meucatalogofacil.com/_core/_uploads/56/2021/08/1145070821fa1bjcicek.jpg" },
    { id: 2, nome: "Açaí com Morango", preco: "R$ 18,00", img: "https://i.pinimg.com/736x/85/7f/9a/857f9a5ece01583d358e4edacb1e50d5.jpg" },
    { id: 3, nome: "Açaí com Nutella", preco: "R$ 22,00", img: "https://soubh.uai.com.br/wp-content/uploads/2025/02/Acai-Bom-Gosto-capa-860x1266.jpg" },
    { id: 4, nome: "Açaí Especial", preco: "R$ 25,00", img: "https://brazzabnu.chefware.com.br/187/0/0/acai-no-copo-400ml.jpg" },
    { id: 5, nome: "Copo Sujo", preco: "R$ 20,00", img: "https://cozinhabruta.blogfolha.uol.com.br/files/2018/12/acai-2493834_1920-768x1152.jpg" },
    { id: 6, nome: "Açaí com Leite", preco: "R$ 35,00", img: "https://i.pinimg.com/736x/77/f6/f3/77f6f3dcf797ca92c4ba0334ffd32f97.jpg" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cabeçalho da Home */}
      <section className="text-center py-16 bg-white shadow-sm">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700">
          Açaí do Eduardo Silva
        </h1>
        <p className="text-gray-600 mt-4 text-lg">O melhor sabor da região direto para você!</p>
        <Link 
          to="/cardapio" 
          className="inline-block mt-6 bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition-all"
        >
          Ver Cardápio Completo
        </Link>
      </section>

      {/* Seção do Slider (Destaques) */}
      <section className="max-w-7xl mx-auto mt-12 px-6 pb-20">
        <h2 className="text-3xl font-bold text-purple-800 mb-8 text-center">
          Nossos Destaques 🔥
        </h2>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-14"
        >
          {produtos.map((produto) => (
            <SwiperSlide key={produto.id}>
              <div className="bg-white border border-purple-100 p-5 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="overflow-hidden rounded-2xl">
                  <img 
                    src={produto.img} 
                    alt={produto.nome} 
                    className="w-full h-52 object-cover" 
                  />
                </div>
                <h3 className="font-bold text-gray-800 text-xl mt-4">{produto.nome}</h3>
                <p className="text-purple-600 font-black text-2xl mt-2">{produto.preco}</p>
                <Link 
                  to="/pedido" 
                  className="inline-block mt-5 bg-purple-600 text-white px-6 py-3 rounded-2xl w-full font-bold hover:bg-purple-800 transition-colors shadow-md"
                >
                  Pedir Agora
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Home;