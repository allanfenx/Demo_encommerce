const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            role: DataTypes.ENUM('client', 'manager', 'admin')
        }, {
            sequelize,
            tableName: "Users"
        });
    }

    static associate(models){
        this.hasMany(models.Andress, { foreignKey: "user_id", as: "andress"});
        this.hasMany(models.UserImage, { foreignKey: "user_id", as: "userimage"});
        this.hasMany(models.RecoverPassword, {foreignKey: "user_id", as: "userecoverpassword"});
        this.hasMany(models.OrderBuy, {foreignKey: "user_id", as: "user_order"});
    }
}

module.exports = User;