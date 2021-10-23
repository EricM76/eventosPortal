'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkInsert('Users', [{
        name: 'Admin',
        email: 'idudalia@gmail.com',
        pass : '$2a$10$NtweQaogJP7mota5sjAQBuunIAITsz.oX9sXX0EZwx9XWjAjQjF4W',
        createdAt: new Date,
        updatedAt: new Date,
     }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
