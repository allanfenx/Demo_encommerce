const { Model, DataTypes } = require('sequelize');

class Order extends Model {
    static init(sequelize) {
        super.init({
            dateBuy: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                validate: {
                    notEmpty: true
                }
            },
            status: {
                type: DataTypes.ENUM('PENDING', 'APPROVED', 'SEND'),
            },
            valorShipping: {
                type: DataTypes.STRING,
                validate: {
                    isDecimal: true
                }
            },
            amount: {
                type: DataTypes.DECIMAL,
                validate: {
                    isDecimal: true
                }
            }
        }, {
            sequelize,
            freezeTableName: true
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id", as: "buyuser" });
        this.belongsTo(models.Product, {foreignKey: "product_id", as: "buyproduct"});
    }
}


module.exports = Order;