const { Model, DataTypes } = require('sequelize');

class ProductImage extends Model {
    static init(sequelize) {
        super.init({
            name_image: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            key_name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
        }, {
            sequelize,
            freezeTableName: true
        })
    }

    static associate(models){
        this.belongsTo(models.Product, {foreignKey: "product_id", as: "imageproduct"});
    }
}

module.exports = ProductImage;