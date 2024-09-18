'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'permissao', Sequelize.STRING)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'permissao')
  }
};
