'use strict';
module.exports = (sequelize, DataTypes) => {
  const Imovel = sequelize.define('Imovel', {
    descricaoImovel: DataTypes.STRING,
    TipoImovelId: DataTypes.INTEGER
  }, {});
  
  Imovel.associate = function(models) {
    Imovel.belongsTo(models.TipoImovel);
    Imovel.hasMany(models.Pagamento);
  };
  
  return Imovel;
};
