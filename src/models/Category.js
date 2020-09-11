const { Model, DataTypes } = require('sequelize');

class Category extends Model {
    static init(sequelize) {
        super.init({
            title: {
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
        }, {
            sequelize,
            freezeTableName: true
        })
    }
    static associate(models) {
        this.hasMany(models.Product, { foreignKey: "category_id", as: "categoryproduct" });
    }
}

module.exports = Category;