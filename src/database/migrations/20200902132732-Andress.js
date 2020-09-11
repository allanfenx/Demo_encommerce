'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('Andress', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      street: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      number: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      zipcode:{
        type: Sequelize.STRING(9),
        allowNull: false
      },
      date:{
        type: Sequelize.DATE,
        allowNull: false
      }
    });

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('Andress');

  }
};
