const express = require('express');
const { Pagamento, Imovel, TipoImovel } = require('./models');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/pagamentos', async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll({
      include: [
        { model: Imovel, include: [TipoImovel] }
      ]
    });

    res.json(pagamentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os pagamentos.' });
  }
});

app.get('/api/pagamentos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const pagamentos = await Pagamento.findAll({
      include: [
        { model: Imovel, include: [TipoImovel] }
      ]
    });

    const resultado = pagamentos
      .filter(pagamento => pagamento.dataValues.id === parseInt(id, 10))
      .map(single => (single));

    if (resultado.length === 0) {
      return res.status(404).json({ error: 'Imóvel não encontrado ou sem pagamentos.' });
    }

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os pagamentos.' });
  }
});

// Função para retornar a soma de pagamentos por imóvel
app.get('/api/imoveis/pagamentos', async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll({
      include: [
        { model: Imovel, include: [TipoImovel] }
      ]
    });

    // Agrupando os pagamentos por imóvel e somando os valores
    const resultado = pagamentos.reduce((acc, pagamento) => {
      const imovelId = pagamento.Imovel.id;
      const valor = parseFloat(pagamento.valorPagamento);

      if (!acc[imovelId]) {
        acc[imovelId] = 0;
      }
      acc[imovelId] += valor;
      return acc;
    }, {});

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular a soma dos pagamentos por imóvel.' });
  }
});

// Função para retornar o total de vendas por mês/ano
app.get('/api/vendas/mes', async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll();

    // Agrupando os pagamentos por mês/ano e somando os valores
    const resultado = pagamentos.reduce((acc, pagamento) => {
      const data = new Date(pagamento.dataPagamento);
      const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;

      if (!acc[mesAno]) {
        acc[mesAno] = 0;
      }
      acc[mesAno] += parseFloat(pagamento.valorPagamento);
      return acc;
    }, {});

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular as vendas por mês/ano.' });
  }
});

// Função para retornar o percentual de vendas por tipo de imóvel
app.get('/api/imoveis/tipos', async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll({
      include: [
        { model: Imovel, include: [TipoImovel] }
      ]
    });

    // Contando o número de vendas por tipo de imóvel
    const totalVendas = pagamentos.length;
    const tipos = pagamentos.reduce((acc, pagamento) => {
      const tipoImovel = pagamento.Imovel.TipoImovel.descricaoTipo;

      if (!acc[tipoImovel]) {
        acc[tipoImovel] = 0;
      }
      acc[tipoImovel] += 1;
      return acc;
    }, {});

    // Calculando o percentual de cada tipo de imóvel
    const percentualTipos = Object.keys(tipos).reduce((acc, tipo) => {
      acc[tipo] = ((tipos[tipo] / totalVendas) * 100).toFixed(2) + '%';
      return acc;
    }, {});

    res.json(percentualTipos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular o percentual de vendas por tipo de imóvel.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
