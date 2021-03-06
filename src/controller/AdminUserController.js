const User = require('../models/User');
const connection = require('../database/connection');
const validador = require('../validate/validator');
const contract = new validador();

const bcrypt = require('bcryptjs');

class UserController {

    async index(req, res) {

        const users = await User.findAll({
            attributes:
                { exclude: ["password"] },

        });

        return res.send({id: req.userID, name: req.name, role: req.role, users})
    }

    async store(req, res) {


        const { name, email, password, role } = req.body;


        contract.hasMinLen(name, 4, 'the name must contain at least 4 characters');
        contract.isEmail(email, 'Valid email required');
        contract.hasMinLen(password, 6, 'the password must contain at least 5 characters');
        contract.passwordCompare(password, repeat_password, 'Password confirmation required');

        if(!contract.isValid()) return res.status(400).send(contract.errors());

        var user = await User.findOne({where: {email}});

        if(user) return res.status(405).send({erro: "Já existe um usuario cadastrado com este email"})

        const trx = await connection.transaction();

        const hash = await bcrypt.hash(password, 10)

        try {

            user = await User.create({ name, email, password: hash, role });

            await trx.commit();

            user.password = undefined;

            return res.send({ user });
        } catch (error) {
            trx.rollback();

            return res.status(400).send({ erro: "Falha ao fazer cadastro tente outra vez" })
        }

    }

    async show(req, res) {

        const id = req.params.id;

        const user = await User.findOne({
            where: { id },
            include: ["userimage", "andress"]
        });

        if(!user) return res.status(400).send({erro: "Usuario não encontrado"});

        user.password = undefined;

        return res.send(user)
    }

    async update(req, res) {

        const { name, email, role } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(400).send({ erro: "Usuario não encontrado" });

        contract.hasMinLen(name, 5, 'the name must contain at least 5 characters');
        contract.isEmail(email, 'Valid email required');
        contract.hasMinLen(password, 6, 'the password must contain at least 5 characters');
        contract.passwordCompare(password, repeat_password, 'Password confirmation required');

        if(!contract.isValid()) return res.status(400).send(contract.errors());

        const trx = await connection.transaction();

        try {

            await user.update({ name, role }, { where: { email: email } });

            await trx.commit();

            return res.send({ user });
        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Falha ao atualizar cadastro tente outra vez" });
        }

    }

    async destroy(req, res) {

        const {id} = req.body;

        const user = await User.findByPk(id);

        const trx = await connection.transaction();

        try {

            await user.destroy()

            trx.commit();

            return res.send();
        } catch (error) {

            trx.rollback();

            return res.status(400).send({ erro: "Não ha um usuario para ser deletado" })
        }
    }
}

module.exports = new UserController();