const Andress = require('../models/Andress');
const connection = require('../database/connection');
const validator = require('../validate/validator');

class AndressController {

    async store(req, res) {

        const user = req.userID

        const { street, district, city, state, zipcode, number } = req.body;

        var contract = new validator();

        contract.hasMinLen(street, 1, 'Street is required');
        contract.hasMinLen(district, 1, 'District is required');
        contract.hasMinLen(city, 1, 'City is required');
        contract.hasMinLen(state, 1, 'State is required');
        contract.hasMinLen(zipcode, 1, 'Zipcode is required');
        contract.hasMinLen(number, 1, 'Number is required');

        if (!contract.isValid()) return res.status(400).send(contract.errors());

        if (!user) return res.status(400).send({ erro: "Usuario não encontrado" });

        var andress = await Andress.findAll({ where: { user_id: user } });

        if (andress.length > 3) return res.status(405).send({ erro: "Só é permitido quatro endereços por usuario" });


        const trx = await connection.transaction();

        try {

            andress = await Andress.create({ street, district, city, state, zipcode, number, user_id: user });

            await trx.commit();

            return res.send({ id: req.userID, name: req.name, andress });
        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Houve uma falha ao cadastrar endereço tente outra vez" });
        }
    }

    async show(req, res) {

        const { id } = req.params;

        const andress = await Andress.findByPk(id);

        if (!andress) return res.status(400).send({ erro: "Enderço não encontrado" });

        return res.send({ andress });
    }

    async update(req, res) {

        const user = req.userID;

        const { street, district, city, state, zipcode, number, id } = req.body;

        var contract = new validator();

        contract.hasMinLen(street, 1, 'Street is required');
        contract.hasMinLen(district, 1, 'District is required');
        contract.hasMinLen(city, 1, 'City is required');
        contract.hasMinLen(state, 1, 'State is required');
        contract.hasMinLen(zipcode, 1, 'Zipcode is required');
        contract.hasMinLen(number, 1, 'Number is required');

        if (!contract.isValid()) return res.status(400).send(contract.errors());

        if (!user) return res.status(400).send({ erro: "Usuario não encontrado" });

        const andress = await Andress.findAll({ where: { user_id: user } });

        const trx = await connection.transaction();

        try {

            await Andress.update({ street, district, city, state, zipcode, number, user_id: user.id }, { where: { id } });

            await trx.commit();

            return res.send({ id: req.userID, name: req.name, andress });
        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Houve uma falha ao atualizar endereço tente outra vez" });
        }
    }

    async destroy(req, res) {

        const { id } = req.body;

        const andress = await Andress.findByPk(id);

        if (!andress) return res.status(400).send({ erro: "Endreço não encontrado" });

        const trx = await connection.transaction();

        try {

            await andress.destroy();

            await trx.commit();

            return res.send();
        } catch (error) {

            await trx.rollback();

            return res.status(405).send({ erro: "Permissão negada" });
        }


    }
}

module.exports = new AndressController();