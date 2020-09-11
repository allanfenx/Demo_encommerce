const { Model, DataTypes } = require('sequelize');

class UserImage extends Model {
    static init(sequelize) {
        super.init({
            name: {
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
        this.belongsTo(models.User, {foreignKey: "user_id", as: "imageuser"});
    }
}

module.exports = UserImage;