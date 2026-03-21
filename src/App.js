import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cardapio from "./pages/Cardapio";
import Pedido from "./pages/Pedido";
import Contato from "./pages/Contato";

function App() {
  const [aberto, setAberto] = useState(false);

  return (
    <BrowserRouter>
      {/* MENU */}
      <nav className="bg-purple-600 text-white p-4 relative">
        <div className="max-w-7xl mx-auto flex justify-end items-center px-6">

          {/* Botão Hambúrguer (Aparece só no Celular) */}
          <button
            onClick={() => setAberto(!aberto)}
            className="md:hidden flex flex-col justify-center items-center z-50"
            aria-label="Abrir menu"
          >
            <span className={`bg-white block transition-all duration-300 h-0.5 w-6 rounded-sm ${aberto ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
            <span className={`bg-white block transition-all duration-300 h-0.5 w-6 rounded-sm my-0.5 ${aberto ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-white block transition-all duration-300 h-0.5 w-6 rounded-sm ${aberto ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
          </button>

          {/* Links de Navegação */}
          <div className={`
            ${aberto ? 'flex' : 'hidden'} 
            md:flex flex-col md:flex-row absolute md:static top-full right-0 
            bg-purple-600 w-full md:w-auto p-6 md:p-0 
            space-y-4 md:space-y-0 md:space-x-9 text-right z-40 shadow-lg md:shadow-none
          `}>
            <Link to="/" onClick={() => setAberto(false)} className="hover:text-purple-200 transition-colors">Home</Link>
            <Link to="/cardapio" onClick={() => setAberto(false)} className="hover:text-purple-200 transition-colors">Cardápio</Link>
            <Link to="/pedido" onClick={() => setAberto(false)} className="hover:text-purple-200 transition-colors">Pedido</Link>
            <Link to="/contato" onClick={() => setAberto(false)} className="hover:text-purple-200 transition-colors">Contato</Link>
          </div>
        </div>
      </nav>

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
        <p onClick={() => new Date().getFullYear()}>© {new Date().getFullYear()} AÇAÍ DO EDUARDO SILVA. Todos os direitos reservados.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;