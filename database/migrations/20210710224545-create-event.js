'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      subtitle: {
        type: Sequelize.STRING
      },
      speaker: {
        type: Sequelize.STRING
      },
      modality:{
        type: Sequelize.STRING
      },
      connection: {
        type: Sequelize.STRING
      },
      plataform:{
        type: Sequelize.STRING
      },
      location:{
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      colorPrimary:{
        type: Sequelize.STRING
      },
      colorBack:{
        type: Sequelize.STRING
      },
      colorText:{
        type: Sequelize.STRING
      },
      bannerDesktop: {
        type: Sequelize.STRING
      },
      bannerMobile: {
        type:Sequelize.STRING
      },
      activityId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Activities'
          },
          key : 'id'
        },
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};