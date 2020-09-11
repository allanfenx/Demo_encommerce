'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {model: "Category", key: "id"},
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      slug: {
        type: Sequelize.STRING(31),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: false
      },
      stock: {
        type: Sequelize.SMALLINT,
        allowNull: false
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('Product');
     
  }
};
