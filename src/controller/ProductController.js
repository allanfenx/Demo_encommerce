const Product = require('../models/Product');
const Category = require('../models/Category');
const connection = require('../database/connection');
const slugify = require('slugify');
const validador = require('../validate/validator');

class ProductController {

    async index(req, res) {

        const product = await Product.findAll();

        return res.send({ product });
    }

    async store(req, res) {

        const { title, name, description, price, stock } = req.body;

        var contract = new validador();

        contract.isRequired(title, 'Title is required');
        contract.isRequired(name, 'Name is required');
        contract.isRequired(description, 'Description is required');
        contract.isRequired(price, 'Price is required');
        contract.isRequired(stock, 'Stock is required');

        if (!contract.isValid()) return res.status(400).send(contract.errors());

        const category = await Category.findOne({
            where: {title},
            include: [{
                association: "categoryproduct",
            }]
        });

        if (!category) return res.status(400).send({ erro: "Categoria não encontrada" })

        var product = await Product.findOne({ where: { name } });

        if (product) return res.status(405).send({ erro: "Não é permitido produtos com o mesmo nome" });

        const trx = await connection.transaction();

        try {

            product = await Product.create({
                name,
                description,
                price,
                stock,
                slug: slugify(name),
                category_id: category.id
            });

            await trx.commit();

            return res.send({ product });

        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Houve um erro ao criar produto" });
        }
    }

    async show(req, res) {

        const { id } = req.params;

        const product = await Product.findByPk(id, { include: { association: "productimage" } });

        return res.send({ product });
    }

    async update(req, res) {

        const { id, title, description, price, stock } = req.body;

        var contract = new validador();

        contract.isRequired(description, 'Description is required');
        contract.isRequired(price, 'Price is required');
        contract.isRequired(stock, 'Stock is required');

        if (!contract.isValid()) return res.status(400).send(contract.errors());

        const category = await Category.findOne({
            where: { title },
            include: { association: "categoryproduct", attributes: ["name"] }
        });

        if (!category) return res.status(400).send({ erro: "Categoria não encontrada" })

        var product = await Product.findByPk(id);

        if (!product) return res.status(400).send({ erro: "Product not found" })   

        const trx = await connection.transaction();

        try {

            product = await Product.update({
                description,
                price,
                stock,
                category_id: category.id
            }, { where: { id } });

            await trx.commit();

            return res.send({ product });

        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Houve um erro ao atualizar produto" });
        }
    }

    async destroy(req, res) {

        const { name } = req.body;

        const product = await Product.findOne({ where: { name } });

        if (!product) return res.status(400).send({ erro: "Produto não encontrado" });

        const trx = await connection.transaction();

        try {

            await product.destroy();

            await trx.commit();

            return res.send();
        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Houve um erro ao excluir produto" });
        }
    }

}

module.exports = new ProductController();