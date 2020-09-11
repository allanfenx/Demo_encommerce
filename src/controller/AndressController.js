const Andress = require('../models/Andress');
const User = require('../models/User');
const connection = require('../database/connection');

class AndressController {


    async store(req, res) {

        const { email, street, district, city, state, zipcode, number } = req.body;
        
        const user = await User.findOne({
            where: { email: email },
            include: { association: "andress", attributes: ["user_id"] }
        });

        if (!user) return res.status(400).send({ erro: "Usuario não encontrado" });

        if (user.andress.length > 3) return res.status(405).send({ erro: "Só é permitido quatro endereços por usuario" });

        const trx = await connection.transaction();

        try {

            const andress = await Andress.create({ street, district, city, state, zipcode, number, user_id: user.id });

            await trx.commit();

            return res.send({ andress });
        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Houve uma falha ao cadastrar endereço tente outra vez" });
        }
    }

    async show(req, res){

        const {id} = req.params;

        const andress = await Andress.findByPk(id);

        if(!andress) return res.status(400).send({erro: "Enderço não encontrado"});

        return res.send({andress});
    }

    async update(req, res){

        
        const { email, street, district, city, state, zipcode, number, id } = req.body;
        
        const user = await User.findOne({
            where: { email },
            include: { association: "andress" }
        });

        if (!user) return res.status(400).send({ erro: "Usuario não encontrado" });


        const trx = await connection.transaction();

        try {

            await Andress.update({ street, district, city, state, zipcode, number, user_id: user.id }, {where: {id}});

            await trx.commit();

            return res.send(user.andress);
        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Houve uma falha ao atualizar endereço tente outra vez" });
        }
    }

    async destroy(req, res){

        const {id} = req.body;

        const andress = await Andress.findByPk(id);

        if(!andress) return res.status(400).send({erro: "Endreço não encontrado"});

        const trx = await connection.transaction();

        try {
            
            await andress.destroy();

            await trx.commit();

            return res.send();
        } catch (error) {
            
            await trx.rollback(); 

            return res.status(405).send({erro: "Permissão negada"});
        }


    }
}

module.exports = new AndressController();