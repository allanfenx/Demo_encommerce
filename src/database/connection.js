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
const Order = require('../models/Order');

const connection = new Sequelize(dbConfig);


//start models
User.init(connection);
Andress.init(connection);
UserImage.init(connection);
RecoverPassword.init(connection);
Category.init(connection);
Product.init(connection);
ProductImage.init(connection);
Order.init(connection);


Andress.associate(connection.models);
User.associate(connection.models);
UserImage.associate(connection.models);
RecoverPassword.associate(connection.models);
Category.associate(connection.models);
Product.associate(connection.models);
ProductImage.associate(connection.models);
Order.associate(connection.models);

module.exports = connection;