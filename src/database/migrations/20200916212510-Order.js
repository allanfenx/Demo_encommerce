'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderBuy', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: "Product", key: "id" },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      dateBuy: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'APPROVED', 'SEND'),
        allowNull: false,
        defaultValue: "PENDING"
      },
      valueShipping: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: false
      },
      quantity: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: false
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrderBuy');

  }
};
