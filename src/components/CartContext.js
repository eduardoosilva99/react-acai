import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const produtos = [
    { id: 1, nome: "Açaí 300ml", preco: 10, img: "https://meucatalogofacil.com" },
    { id: 2, nome: "Açaí 500ml", preco: 15, img: "https://pinimg.com" },
    { id: 3, nome: "Açaí 700ml", preco: 20, img: "https://chefware.com.br" },
    { id: 19, nome: "Açaí com Nutella", preco: 22, img: "https://uai.com.br" },
    { id: 20, nome: "Açaí Especial", preco: 25, img: "https://uol.com.br" },
    { id: 7, nome: "Granola", preco: 2, img: "https://placeholder.com" },
    { id: 9, nome: "Morango", preco: 3, img: "https://placeholder.com" },
    { id: 13, nome: "Leite em Pó", preco: 2, img: "https://placeholder.com" },
  ];

  const [carrinho, setCarrinho] = useState([]);

  // Carregar do LocalStorage
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      try {
        setCarrinho(JSON.parse(carrinhoSalvo));
      } catch {
        setCarrinho([]);
      }
    }
  }, []);

  // Salvar no LocalStorage
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarProduto = (produto) => {
    // 1. Som de Pop (Link direto funcional)
    const audio = new Audio('https://mixkit.co');
    audio.volume = 0.4;
    audio.play().catch(() => {}); // Evita erro se o navegador bloquear áudio automático

    // 2. Notificação
    toast.success(`${produto.nome} no carrinho!`, {
      duration: 1500,
      style: {
        border: '2px solid #7e22ce',
        padding: '12px',
        color: '#7e22ce',
        fontWeight: 'bold',
        borderRadius: '15px'
      },
      icon: '🍧',
    });

    setCarrinho((prev) => {
      const existe = prev.find(item => item.id === produto.id);
      if (existe) {
        return prev.map(item =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerProduto = (id) => {
    setCarrinho((prev) => prev.filter(item => item.id !== id));
    toast.error("Item removido", { duration: 1000 });
  };

  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  const clearCart = () => setCarrinho([]);

  return (
    <CartContext.Provider value={{ produtos, carrinho, adicionarProduto, removerProduto, total, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
