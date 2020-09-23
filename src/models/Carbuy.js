const { Model, DataTypes } = require('sequelize');

class CarBuy extends Model {
    static init(sequelize) {
        super.init({
            dateOrderProduct: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                validate: {
                    notEmpty: true
                }
            },
            product_price: {
                type: DataTypes.DECIMAL(7, 2),
                validate: {
                    isDecimal: true
                }
            },
            quantityProduct: {
                type: DataTypes.SMALLINT,
                validate: {
                    isInt: true
                }
            },
        }, {
            sequelize,
            freezeTableName: true
        })
    }
    static associate(models){
        this.hasOne(models.OrderBuy, { foreignKey: "carBuy_id", as: "carbuy_order"});
        this.belongsTo(models.Product, { foreignKey: "products_id", as: "carbuy_product"});
    }
}


module.exports = CarBuy;