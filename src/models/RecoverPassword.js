const { Model, DataTypes } = require('sequelize');

class RecoverPassword extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            passwordResetToken: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            passwordResetExpire: {
                type: DataTypes.DATE
            },
            orderDate: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        }, {
            sequelize,
            freezeTableName: true
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id", as: "recoverpassworduser" });
    }
}

module.exports = RecoverPassword;