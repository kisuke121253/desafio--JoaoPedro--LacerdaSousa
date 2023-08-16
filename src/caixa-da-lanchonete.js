class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: { descricao: "Café", valor: 3.0 },
      chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
      suco: { descricao: "Suco Natural", valor: 6.2 },
      sanduiche: { descricao: "Sanduíche", valor: 6.5 },
      queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    };
    this.formasDePagamento = ["dinheiro", "debito", "credito"];
    this.descontosETaxas = {
      dinheiro: -0.05,
      credito: 0.03,
    };
    this.itensExtras = {
      chantily: "cafe",
      queijo: "sanduiche",
    };
    this.combos = ["combo1", "combo2"];
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (!this.formasDePagamento.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }
    let total = 0;
    let itensPrincipais = [];
    for (let i = 0; i < itens.length; i++) {
      let [codigo, quantidade] = itens[i].split(",");
      quantidade = parseInt(quantidade);
      if (quantidade === 0) {
        return "Quantidade inválida!";
      }
      if (!this.cardapio.hasOwnProperty(codigo)) {
        return "Item inválido!";
      }
      if (this.itensExtras.hasOwnProperty(codigo)) {
        if (!itensPrincipais.includes(this.itensExtras[codigo])) {
          return "Item extra não pode ser pedido sem o principal";
        }
      } else if (!this.combos.includes(codigo)) {
        itensPrincipais.push(codigo);
      }
      total += this.cardapio[codigo].valor * quantidade;
    }
    if (this.descontosETaxas.hasOwnProperty(formaDePagamento)) {
      total *= 1 + this.descontosETaxas[formaDePagamento];
    }
    return `R$ ${total.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
