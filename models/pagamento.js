'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pagamento = sequelize.define('Pagamento', {
    dataPagamento: DataTypes.DATE,
    valorPagamento: DataTypes.DECIMAL,
    ImovelId: DataTypes.INTEGER
  }, {});
  
  Pagamento.associate = function(models) {
    Pagamento.belongsTo(models.Imovel);
  };
  
  return Pagamento;
};
