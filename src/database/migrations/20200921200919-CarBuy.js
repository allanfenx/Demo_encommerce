'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('CarBuy', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      products_id: {
        type: Sequelize.INTEGER,
        references: { model: "Product", key: "id" },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      product_price: {
          type: Sequelize.DECIMAL(7, 2),
          allowNull: false
      },
      dateOrderProduct: {
        type: Sequelize.DATE,
        allowNull: false
      },
      quantityProduct: {
        type: Sequelize.SMALLINT,
        allowNull: false
      },
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CarBuy');

  }
};
