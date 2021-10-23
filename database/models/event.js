'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.Activity,{
        as:'activity'
      })
      Event.hasMany(models.Record,{
        as: 'records',
        onDelete : 'cascade'
      })
      Event.hasMany(models.Logo,{
        as: 'logos',
        onDelete : 'cascade'
      })
      Event.hasOne(models.Link,{
        as : 'link',
        foreignKey : 'id',
        onDelete : 'cascade'
      })
    }
  };
  Event.init({
    name: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    speaker: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    connection: DataTypes.STRING,
    plataform: DataTypes.STRING,
    modality: DataTypes.STRING,
    location: DataTypes.STRING,
    colorPrimary: DataTypes.STRING,
    colorBack: DataTypes.STRING,
    colorText: DataTypes.STRING,
    bannerDesktop: DataTypes.STRING,
    bannerMobile: DataTypes.STRING,
    activityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};