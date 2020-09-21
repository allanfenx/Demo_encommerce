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
                type: DataTypes.ENUM('PENDING', 'APPROVED', 'SEND'),
            },
            valorShipping: {
                type: DataTypes.STRING,
                validate: {
                    isDecimal: true
                }
            },
            quantity: {
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
    
}


module.exports = OrderBuy;