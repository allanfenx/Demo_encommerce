const { Model, DataTypes } = require('sequelize');

class Andress extends Model {
    static init(sequelize) {
        super.init({
            street: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            district: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            city: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            state: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            number: {
                type: DataTypes.SMALLINT,
                vallidate: {
                    notEmpty: true
                }
            },
            zipcode: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true
                }
            },
            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        }, {
            sequelize,
            freezeTableName: true
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "user_id", as: "andressuser" });
    }
}


module.exports = Andress;