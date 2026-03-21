function Carrinho({ carrinho, removerProduto }) {
  return (
    <div>
      {carrinho.map((item) => (
        <div key={item.id} className="carrinho-item">
          <span>{item.nome} x{item.quantidade}</span>
          <button onClick={() => removerProduto(item.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default Carrinho;