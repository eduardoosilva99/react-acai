import { useState, useEffect } from 'react';
import '../App.css';

function Pedido() {
  const produtos = [
    { id: 1, nome: "Açaí 300ml", preco: 10 },
    { id: 2, nome: "Açaí 500ml", preco: 15 },
    { id: 3, nome: "Açaí 700ml", preco: 20 },
    { id: 4, nome: "Açaí 1L", preco: 25 },
    { id: 5, nome: "Açaí 1,5L", preco: 35 },
    { id: 6, nome: "Açaí 2L", preco: 45 },
    { id: 7, nome: "Granola", preco: 2 },
    { id: 8, nome: "Leite Condensado", preco: 2 },
    { id: 9, nome: "Morango", preco: 3 },
    { id: 10, nome: "Banana", preco: 2 },
  ];

  const [carrinho, setCarrinho] = useState([]);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');

  useEffect(() => {
    try {
      const carrinhoSalvo = localStorage.getItem('carrinho');
      if (carrinhoSalvo) setCarrinho(JSON.parse(carrinhoSalvo));
    } catch {
      setCarrinho([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  useEffect(() => {
    try {
      const dados = localStorage.getItem('cliente');
      if (dados) {
        const cliente = JSON.parse(dados);
        setNome(cliente.nome || '');
        setEndereco(cliente.endereco || '');
        setBairro(cliente.bairro || '');
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('cliente', JSON.stringify({ nome, endereco, bairro }));
  }, [nome, endereco, bairro]);

  function adicionarProduto(produto) {
    setCarrinho((prev) => {
      const existe = prev.find(item => item.id === produto.id);

      if (existe) {
        return prev.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  function removerProduto(id) {
    setCarrinho((prev) => prev.filter(item => item.id !== id));
  }

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  function enviarWhatsApp() {
    if (!nome || !endereco || !bairro) {
      alert("Preencha nome, endereço e bairro!");
      return;
    }

    if (carrinho.length === 0) {
      alert("Adicione itens ao carrinho!");
      return;
    }

    let mensagem = `🍧 *Pedido - Açaí do Eduardo Silva*%0A%0A`;
    mensagem += `👤 *Nome:* ${nome}%0A`;
    mensagem += `📍 *Endereço:* ${endereco}%0A`;
    mensagem += `🏘️ *Bairro:* ${bairro}%0A%0A`;

    mensagem += `🛒 *Itens:*%0A`;

    carrinho.forEach(item => {
      mensagem += `• ${item.nome} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}%0A`;
    });

    mensagem += `%0A💰 *Total:* R$ ${total.toFixed(2)}`;

    const telefone = "5599999999999";
    const url = `https://wa.me/${telefone}?text=${mensagem}`;

    window.open(url, '_blank');
    setCarrinho([]);
    alert("Pedido enviado!");
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* FORM */}
      <div className="bg-white rounded-2xl shadow p-4 mb-4 space-y-2">
        <input
          className="w-full p-2 border rounded"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded"
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

      {/* PRODUTOS */}
      <h2 className="font-bold mb-2 text-lg">Produtos</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white rounded-2xl shadow p-4 text-center hover:scale-105 transition"
          >
            <p className="font-semibold">{produto.nome}</p>
            <p className="text-green-600 font-bold">
              R$ {produto.preco.toFixed(2)}
            </p>

            <button
              className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
              onClick={() => adicionarProduto(produto)}
            >
              Adicionar
            </button>
          </div>
        ))}
      </div>

      {/* CARRINHO */}
      <h2 className="font-bold mt-6 mb-2 text-lg">Carrinho</h2>

      <div className="bg-white rounded-2xl shadow p-4">
        {carrinho.length === 0 ? (
          <p className="text-gray-500">Carrinho vazio</p>
        ) : (
          carrinho.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>
                {item.nome} x{item.quantidade}
              </span>

              <span className="font-bold">
                R$ {(item.preco * item.quantidade).toFixed(2)}
              </span>

              <button
                className="text-red-500 ml-2"
                onClick={() => removerProduto(item.id)}
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>

      {/* TOTAL */}
      <h3 className="mt-4 text-xl font-bold ">
        Total: R$ {total.toFixed(2)}
      </h3>
      <button
        disabled={carrinho.length === 0}
        className={`w-full py-3 rounded-2xl font-bold ${
          carrinho.length === 0
            ? "bg-gray-400"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
        onClick={enviarWhatsApp}
      >
        Enviar pedido no WhatsApp 📱
      </button>
    </div>
  );
}

export default Pedido;