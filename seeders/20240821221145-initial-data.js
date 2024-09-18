'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TipoImovels', [
      { descricaoTipo: 'Apartamento', createdAt: new Date(), updatedAt: new Date() },
      { descricaoTipo: 'Casa', createdAt: new Date(), updatedAt: new Date() },
      { descricaoTipo: 'Sala Comercial', createdAt: new Date(), updatedAt: new Date() },
      { descricaoTipo: 'Terreno', createdAt: new Date(), updatedAt: new Date() }
    ], {});
    
    const imoveis = await queryInterface.bulkInsert('Imovels', [
      { descricaoImovel: 'Apartamento 100 m2 em condomínio fechado', TipoImovelId: 1, createdAt: new Date(), updatedAt: new Date() },
      { descricaoImovel: 'Casa de 3 quartos com quintal', TipoImovelId: 2, createdAt: new Date(), updatedAt: new Date() },
      { descricaoImovel: 'Sala Comercial 50 m2 no centro', TipoImovelId: 3, createdAt: new Date(), updatedAt: new Date() },
      { descricaoImovel: 'Terreno 500 m2 no bairro X', TipoImovelId: 4, createdAt: new Date(), updatedAt: new Date() }
    ], { returning: true });
    
    await queryInterface.bulkInsert('Pagamentos', [
      { dataPagamento: '2024-01-15', valorPagamento: 5000.00, ImovelId: imoveis[0].id, createdAt: new Date(), updatedAt: new Date() },
      { dataPagamento: '2024-01-20', valorPagamento: 7000.00, ImovelId: imoveis[1].id, createdAt: new Date(), updatedAt: new Date() },
      { dataPagamento: '2024-02-10', valorPagamento: 3000.00, ImovelId: imoveis[2].id, createdAt: new Date(), updatedAt: new Date() },
      { dataPagamento: '2024-02-15', valorPagamento: 4000.00, ImovelId: imoveis[3].id, createdAt: new Date(), updatedAt: new Date() }
      // Adicione mais registros conforme necessário
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Pagamentos', null, {});
    await queryInterface.bulkDelete('Imovels', null, {});
    await queryInterface.bulkDelete('TipoImovels', null, {});
  }
};
