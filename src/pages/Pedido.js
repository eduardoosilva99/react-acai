import { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Pedido() {
  const { carrinho, removerProduto, total, clearCart } = useCart();
  const navigate = useNavigate(); 

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');

  const aplicarMascaraTelefone = (valor) => {
    let v = valor.replace(/\D/g, ""); 
    if (v.length > 11) v = v.slice(0, 11); 

    if (v.length > 10) {
      v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (v.length > 5) {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (v.length > 0) {
      v = v.replace(/^(\d{0,2})/, "($1");
    }
    return v;
  };

  const handleTelefoneChange = (e) => {
    const valorFormatado = aplicarMascaraTelefone(e.target.value);
    setTelefone(valorFormatado);
  };

  useEffect(() => {
    try {
      const dados = localStorage.getItem('cliente');
      if (dados) {
        const cliente = JSON.parse(dados);
        setNome(cliente.nome || '');
        setTelefone(cliente.telefone || '');
        setEndereco(cliente.endereco || '');
        setBairro(cliente.bairro || '');
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('cliente', JSON.stringify({ nome, telefone, endereco, bairro }));
  }, [nome, telefone, endereco, bairro]);

  function enviarWhatsApp() {
    const numerosApenas = telefone.replace(/\D/g, ''); 

    if (!nome || !telefone || !endereco || !bairro) {
      alert("Preencha todos os campos!");
      return;
    }

    if (numerosApenas.length < 10 || numerosApenas.length > 11) {
      alert("Telefone inválido! Use o formato (61) 99999-9999");
      return;
    }

    if (carrinho.length === 0) {
      alert("Adicione itens ao carrinho!");
      return;
    }

    let mensagem = `🍧 *Pedido - Açaí do Eduardo Silva*%0A%0A`;
    mensagem += `👤 *Nome:* ${nome}%0A`;
    mensagem += `📞 *Telefone:* ${telefone}%0A`; 
    mensagem += `📍 *Endereço:* ${endereco}%0A`;
    mensagem += `🏘️ *Bairro:* ${bairro}%0A%0A`;
    mensagem += `🛒 *Itens:*%0A`;
    carrinho.forEach(item => {
      mensagem += `• ${item.nome} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}%0A`;
    });
    mensagem += `%0A💰 *Total:* R$ ${total.toFixed(2)}`;

    const numeroVenda = "5561999999999"; 
    const url = `https://wa.me/${numeroVenda}?text=${mensagem}`;

    window.open(url, '_blank');
    clearCart();
    alert("Pedido enviado!");
    navigate("/");
   }

  return (
    <div className="max-w-5xl mx-auto p-5">
      <div className="bg-white rounded-2xl shadow p-6 mb-4 space-y-4">
        
        <div>
          <label htmlFor="nome" className="font-bold text-purple-700 block mb-1">Nome do Cliente</label>
          <input
            id="nome"
            name="nome"
            autoComplete="name"
            className="w-full p-3 border-2 border-purple-50 rounded-xl focus:border-purple-500 outline-none transition-all"
            placeholder="Seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="telefone" className="font-bold text-purple-700 block mb-1">Telefone (WhatsApp)</label>
          <input
            id="telefone"
            name="telefone"
            autoComplete="tel"
            className="w-full p-3 border-2 border-purple-50 rounded-xl focus:border-purple-500 outline-none transition-all"
            placeholder="(61) 99999-9999"
            value={telefone} 
            onChange={handleTelefoneChange} 
            maxLength={15} 
          />
        </div>
        
        <div>
          <label htmlFor="endereco" className="font-bold text-purple-700 block mb-1">Endereço de Entrega</label>
          <input
            id="endereco"
            name="endereco"
            autoComplete="street-address"
            className="w-full p-3 border-2 border-purple-50 rounded-xl focus:border-purple-500 outline-none transition-all"
            placeholder="Ex: Quadra 10, Lote 05, Casa 02"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="bairro" className="font-bold text-purple-700 block mb-1">Bairro</label>
          <select
            id="bairro"
            name="bairro"
            className="w-full p-3 border-2 border-purple-50 rounded-xl focus:border-purple-500 outline-none transition-all bg-white"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          >
            <option value="">Selecione o bairro</option>
            <option value="Centro">Centro</option>
            <option value="Napoles B">Napoles B</option>
            <option value="Friburgo">Friburgo</option>
            <option value="Ocidental Park">Ocidental Park</option>
          </select>
        </div>
      </div>

      <h2 className="font-bold mt-6 mb-2 text-xl text-gray-800">Seu Carrinho</h2>
      <div className="bg-white rounded-2xl shadow p-4">
        {carrinho.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Seu carrinho está vazio 🛒</p>
        ) : (
          carrinho.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b last:border-0 py-3">
              <div>
                <span className="font-semibold">{item.nome}</span>
                <span className="text-gray-500 text-sm ml-2">x{item.quantidade}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-purple-700">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                <button 
                  className="text-red-500 hover:scale-110 transition-transform" 
                  onClick={() => removerProduto(item.id)}
                  title="Remover item"
                >
                  ❌
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between items-center mt-6 mb-6">
        <h3 className="text-2xl font-black text-gray-800">Total:</h3>
        <span className="text-2xl font-black text-purple-700">R$ {total.toFixed(2)}</span>
      </div>

      <button
        disabled={carrinho.length === 0}
        className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
          carrinho.length === 0 
            ? "bg-gray-300 cursor-not-allowed" 
            : "bg-green-500 hover:bg-green-600 text-white transform active:scale-95"
        }`}
        onClick={enviarWhatsApp}
      >
        Finalizar Pedido no WhatsApp 📱
      </button>
    </div>
  );
}

export default Pedido;
