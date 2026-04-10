import React from 'react';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom'; // Para navegar até a página de pedido

function Cardapio() {
  const { produtos, adicionarProduto, total, carrinho } = useCart();
  const navigate = useNavigate();

  // Calcula o total de itens no carrinho
  const quantidadeItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <div className="bg-gray-50 min-h-screen pb-32 relative"> {/* Aumentei o padding inferior para o botão não cobrir o último item */}
      
      {/* CABEÇALHO DO CARDÁPIO */}
      <section className="text-center py-12 bg-white shadow-sm mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700">
          Nosso Cardápio 🍧
        </h1>
        <p className="text-gray-600 mt-4 text-lg px-4">
          Monte o seu açaí do seu jeito com os melhores ingredientes!
        </p>
      </section>

      {/* GRADE DE PRODUTOS */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-white rounded-3xl shadow-md p-3 text-center hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-purple-50"
            >
              <div className="overflow-hidden rounded-2xl mb-3">
                <img 
                  src={produto.img || "https://placeholder.com"} 
                  alt={produto.nome}
                  className="w-full h-40 md:h-48 object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="px-2">
                <h3 className="font-bold text-gray-800 text-lg leading-tight h-12 flex items-center justify-center">
                  {produto.nome}
                </h3>
                <p className="text-purple-600 font-black text-xl mt-1">
                  R$ {produto.preco.toFixed(2)}
                </p>
              </div>

              <button
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-2xl transition-colors shadow-md active:scale-95"
                onClick={() => adicionarProduto(produto)}
              >
                Adicionar ➕
              </button>
            </div>
          ))}
        </div>
      </div>

      {quantidadeItens > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center px-6 z-50">
          <button
            onClick={() => navigate('/pedido')}
            className="bg-green-500 hover:bg-green-600 text-white w-full max-w-md py-4 rounded-2xl shadow-2xl flex justify-between items-center px-8 transition-all transform hover:scale-105 active:scale-95 animate-bounce-short"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-700 text-xs font-bold px-2 py-1 rounded-lg">
                {quantidadeItens}
              </div>
              <span className="font-bold text-lg">Ver Carrinho 🛒</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-90">Total:</span>
              <span className="font-black text-xl">R$ {total.toFixed(2)}</span>
              <span className="text-2xl">➔</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default Cardapio;
