const { Model, DataTypes } = require('sequelize');

class Product extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            slug: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            description: {
                type: DataTypes.STRING,
                vali: {
                    notEmpty: true
                }
            },
            price: {
                type: DataTypes.DECIMAL,
                validate: {
                    isDecimal: true
                }
            },
            stock: {
                type: DataTypes.SMALLINT,
                validate: {
                    isInt: true
                }
            }
        }, {
            sequelize,
            freezeTableName: true
        })
    }
    static associate(models) {
        this.belongsTo(models.Category, { foreignKey: "category_id", as: "productcategory" });
        this.hasMany(models.ProductImage, {foreignKey: "product_id", as: "productimage"});
        this.hasMany(models.CarBuy, { foreignKey: "products_id", as: "product_carbuy"});
    }
}

module.exports = Product;