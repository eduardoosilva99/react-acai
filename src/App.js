import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cardapio from "./pages/Cardapio";
import Pedido from "./pages/Pedido";
import Contato from "./pages/Contato";
import { CartProvider, useCart } from "./components/CartContext"; // Adicionei useCart aqui

function Navbar({ aberto, setAberto }) {
  const { carrinho, total } = useCart();
  const [animar, setAnimar] = useState(false);
  
  const quantidadeItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const fecharMenu = () => setAberto(false);

  // Dispara o pulinho toda vez que a quantidade de itens mudar
  useEffect(() => {
    if (quantidadeItens === 0) return;
    
    setAnimar(true);
    const timer = setTimeout(() => setAnimar(false), 300);
    
    return () => clearTimeout(timer);
  }, [quantidadeItens]);

  return (
    <nav className="bg-purple-700 text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6">
        
        {/* LOGO */}
        <Link to="/" onClick={fecharMenu} className="flex items-center gap-2">
          <span className="text-2xl animate-bounce">🍧</span>
          <span className="font-black text-xl tracking-tighter uppercase">
            Açaí <span className="text-purple-300">Eduardo</span>
          </span>
        </Link>

        {/* LINKS DESKTOP */}
        <div className="hidden md:flex items-center space-x-8 font-bold">
          <Link to="/" className="hover:text-purple-300 transition-all">Home</Link>
          <Link to="/cardapio" className="hover:text-purple-300 transition-all">Cardápio</Link>
          
          <Link 
            to="/pedido" 
            className={`relative flex items-center gap-2 bg-purple-800 px-4 py-2 rounded-full transition-all border border-purple-500 ${animar ? 'scale-110 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'scale-100'}`}
          >
            <span>🛒</span>
            <span>R$ {total.toFixed(2)}</span>
            {quantidadeItens > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-purple-700 font-bold">
                {quantidadeItens}
              </span>
            )}
          </Link>
          <Link to="/contato" className="bg-white text-purple-700 px-5 py-2 rounded-full hover:bg-purple-100 shadow-md">Contato</Link>
        </div>

        {/* ÁREA MOBILE */}
        <div className="flex md:hidden items-center gap-5">
          <Link 
            to="/pedido" 
            onClick={fecharMenu} 
            className={`relative p-2 bg-purple-800 rounded-lg border border-purple-500 transition-transform duration-300 ${animar ? 'scale-125' : 'scale-100'}`}
          >
            <span className="text-xl">🛒</span>
            {quantidadeItens > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {quantidadeItens}
              </span>
            )}
          </Link>

          <button onClick={() => setAberto(!aberto)} className="relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none">
            <div className="space-y-1.5">
              <span className={`block w-7 h-1 bg-white rounded-full transition-all duration-300 ${aberto ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`block w-7 h-1 bg-white rounded-full transition-all duration-300 ${aberto ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-7 h-1 bg-white rounded-full transition-all duration-300 ${aberto ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* MENU MOBILE SLIDE */}
      <div className={`md:hidden absolute top-full left-0 w-full transition-all duration-500 overflow-hidden ${aberto ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-6 space-y-4 font-bold text-center bg-purple-800 border-t border-purple-600 shadow-2xl">
          <Link to="/" onClick={fecharMenu} className="py-3 hover:bg-purple-700 rounded-xl">🏠 Home</Link>
          <Link to="/cardapio" onClick={fecharMenu} className="py-3 hover:bg-purple-700 rounded-xl">📖 Cardápio</Link>
          <Link to="/pedido" onClick={fecharMenu} className="py-3 bg-purple-900 rounded-xl flex justify-center items-center gap-2">
            🛒 Meu Carrinho <span className="text-green-400">(R$ {total.toFixed(2)})</span>
          </Link>
          <Link to="/contato" onClick={fecharMenu} className="bg-white text-purple-700 py-4 rounded-xl shadow-lg mt-2">📞 Falar com Eduardo</Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [aberto, setAberto] = useState(false);

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar aberto={aberto} setAberto={setAberto} />

        {/* ROTAS */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cardapio" element={<Cardapio />} />
            <Route path="/pedido" element={<Pedido />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </main>

        {/* RODAPÉ */}
        <footer className="bg-purple-600 text-white p-4 relative text-center mt-10">
          <p>© {new Date().getFullYear()} AÇAÍ DO EDUARDO SILVA. <br />Todos os direitos reservados.</p>
        </footer>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
