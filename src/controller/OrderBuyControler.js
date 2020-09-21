const OrderBuy = require('../models/OrderBuy');
const Product = require('../models/Product');
const connection = require('../database/connection');

class OrderBuyController {

    async oderBuy(req, res) {

        const user = req.userID;

        const { name, quantity } = req.body;

        var product = await Product.findOne({ where: { name } });

        if(!user) return res.status(400).send({erro: "User not found"});

        if(!product) return res.status(400).send({erro: "Product not found"});

        const amount = product.price * quantity;

        const items = product.stock - quantity;

        const trx = await connection.transaction();

        try {
            
            const order = await OrderBuy.create({name, quantity, amount, user_id: user, product_id: product.id});

            product = await Product.update({stock: items}, {where: {name}});

            await trx.commit();

            return res.send({order});
        } catch (error) {
            
            await trx.rollback();

            return res.status(400).send({erro: "Houve uma falha ao criar seu pedido"});
        }

    }
}

module.exports = new OrderBuyController();