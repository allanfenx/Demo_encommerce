const { model } = require("../connection");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Product',
      'order_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: "OrderBuy", key: "id"
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Product',
      'order_id',
      );
  }
};

