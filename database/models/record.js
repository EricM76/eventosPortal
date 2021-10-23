'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Record.belongsTo(models.Event,{
        as: 'event',
      })
    }
  };
  Record.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    dni: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    birthday: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.NUMBER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    eventId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Record',
  });
  return Record;
};