function Produto({ produto, adicionarProduto }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold">{produto.nome}</h2>
      <strong>R$ {produto.preco.toFixed(2)}</strong>

      <button onClick={() => adicionarProduto(produto)}>
        Adicionar
      </button>
    </div>
  );
}

export default Produto;