'use strict';
module.exports = (sequelize, DataTypes) => {
  const TipoImovel = sequelize.define('TipoImovel', {
    descricaoTipo: DataTypes.STRING
  }, {});
  
  TipoImovel.associate = function(models) {
    TipoImovel.hasMany(models.Imovel);
  };
  
  return TipoImovel;
};
