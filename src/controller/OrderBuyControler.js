const OrderBuy = require('../models/OrderBuy');
const Product = require('../models/Product');
const connection = require('../database/connection');
const User = require('../models/User');
const CarBuy = require('../models/Carbuy');

class OrderBuyController {

    async index(req, res) {

        const user = req.userID;

        if (!user) return res.status(400).send({ erro: "User not found" });

        const order = await User.findByPk(user, {
            attributes: { exclude: ["password"] },
            include: [
                { association: "user_order" }]
        });

        const carBuy = await CarBuy.findAll({include:[{association: "carbuy_order"}]})

        return res.send({  carBuy });
    }

    async store(req, res) {

        const user = req.userID; 

        const {id, quantityProduct} = req.body;

        if(!user) return res.status(400).send({erro: "User not found"});

        var product = await Product.findByPk(id);

        const amount = quantityProduct * product.price;

        const quantityItems = quantityProduct;

        const trx = await connection.transaction();

        try {
            
            const carBuy = await CarBuy.create({products_id: product.id, product_price: product.price, quantityProduct});

            const order = await OrderBuy.create({quantityItems, amount, carBuy_id: carBuy.id, user_id: user});

            await trx.commit();

            return res.send(order);

        } catch (error) {
            
            await trx.rollback()

            return res.status(400).send({erro: "Houve um erro ao cadastrar ordem de compra" + error});

;        }

    }
}

module.exports = new OrderBuyController();