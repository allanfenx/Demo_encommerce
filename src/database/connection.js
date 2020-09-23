const {Sequelize} = require('sequelize');
const dbConfig = require('../config/database');

//Model imports
const User = require('../models/User');
const Andress = require('../models/Andress');
const UserImage = require('../models/UserImage');
const RecoverPassword = require('../models/RecoverPassword');
const Category = require('../models/Category');
const Product = require('../models/Product');
const ProductImage = require('../models/ProductImage');
const OrderBuy = require('../models/OrderBuy');
const CarBuy = require('../models/Carbuy');

const connection = new Sequelize(dbConfig);


//start models
User.init(connection);
Andress.init(connection);
UserImage.init(connection);
RecoverPassword.init(connection);
Category.init(connection);
Product.init(connection);
ProductImage.init(connection);
OrderBuy.init(connection);
CarBuy.init(connection);

User.associate(connection.models);
Product.associate(connection.models);
Andress.associate(connection.models);
UserImage.associate(connection.models);
RecoverPassword.associate(connection.models);
Category.associate(connection.models);
ProductImage.associate(connection.models);
CarBuy.associate(connection.models);

module.exports = connection;