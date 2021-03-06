const { Model, DataTypes } = require('sequelize');

class OrderBuy extends Model {
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
                type: DataTypes.ENUM('PENDING', 'APPROVED', 'CANCELED'),
            },
            valueShipping: {
                type: DataTypes.STRING,
                validate: {
                    isDecimal: true
                }
            },
            quantityItems: {
                type: DataTypes.SMALLINT,
                validate: {
                    isInt: true
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
    static associate(models){
        this.belongsToMany(models.CarBuy, { foreignKey: "carBuy_id", as: "order_carbuy"});
        this.belongsTo(models.User, {foreignKey: "user_id", as: "order_user"});
    }
}


module.exports = OrderBuy;