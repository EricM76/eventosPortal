'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Link.belongsTo(models.Event,{
        as: 'event',
      })
    }
  };
  Link.init({
    route: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Link',
  });
  return Link;
};