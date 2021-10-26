'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    return await queryInterface.addColumn(
      'Events',
      'active',
      {
        type : Sequelize.BOOLEAN,
        defaultValue : 1
      }
    );

  },

  down: async (queryInterface, Sequelize) => {
  
    return await queryInterface.removeColumn(
      'Events',
      'active',
    );
    
  }
};
