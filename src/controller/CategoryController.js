const Category = require('../models/Category');
const slugify = require('slugify');
const connection = require('../database/connection');
const validator = require('../validate/validator');

class CategoryController{

    async index(req, res){

        const category = await Category.findAll();

        return res.send(category);
    }

    async store(req, res){

        const { title} = req.body;

        var contract = new validator();

        contract.isRequired(title, 'Title is required')

        if(!contract.isValid()) return res.status(400).send(contract.errors());

        var category = await Category.findOne({where: {title}});

        if(category) return res.status(405).send({erro: "Não é permitido ter mais de uma categoria com o mesmo nome"});

        const trx = await connection.transaction();

        try {

            category = await Category.create({title, slug: slugify(title)});

            await trx.commit();

            return res.send({category});
        } catch (error) {
            
            await trx.rollback();

            return res.status(400).send({erro: "Houve uma falha ao cadastrar categoria"});
        }

    }

    async show(req, res){

        const {id} = req.params;

        const category = await Category.findByPk(id);

        return res.send({category});
    }

    async update(req, res){

        const {title, id} = req.body;

        var contract = new validator();

        contract.isRequired(title, 'Title is required')

        if(!contract.isValid()) return res.status(400).send(contract.errors());

        var category = await Category.findByPk(id);

        if(!category) return res.status(400).send({erro: "Categoria não encontrada"});

        if(title == category.title) return res.status(405).send({erro: "Não é permitido duas categorias iguais"})

        const trx = await connection.transaction();

        try {

            category = await Category.update({title, slug: slugify(title)}, {where: {id}});
        
            await trx.commit();

            return res.send(category);
        } catch (error) {
            
            await trx.rollback();

            return res.status(400).send({erro: "Houve uma falha ao atualizar categoria" });
        }
    }

    async destroy(req, res){

        const {title} = req.body;

        var category = await Category.findOne({where: {title}});

        if(!category) return res.status(400).send({erro: "Categoria não encontrada"});

        const trx = await connection.transaction();

        try {
            
            await category.destroy();

            await trx.commit();

            return res.send();
        } catch (error) {

            await trx.rollback();

            return res.status(400).send({erro: "Houve um erro ao deletar categoria"})
        }
    }
}

module.exports = new CategoryController();