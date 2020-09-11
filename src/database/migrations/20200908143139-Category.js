'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('Category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      slug: {
        type: Sequelize.STRING(50),
        allowNull: false,
      }

    });

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('Category');

  }
};
