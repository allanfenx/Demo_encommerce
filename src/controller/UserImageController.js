const UserImage = require('../models/UserImage');
const User = require('../models/User');
const connection = require('../database/connection');
const fs_unlink = require('../config/fs_unlink');


class UserImageController {


    async store(req, res) {

        const user =  req.userId

        const { originalname: name, filename: key_name } = req.file;


        if (!user){
            fs_unlink(key_name);
            return res.status(400).send({ erro: "Usuario não encontrado" });
        } 
        

        if (user.userimage.length > 0){
            fs_unlink(key_name);
            return res.status(405).send({ erro: "Só é permitido uma imagem por usuario" });
        }

        const trx = await connection.transaction();

        try {

            const image = await UserImage.create({ name, key_name, user_id: user.id });

            await trx.commit();

            return res.send(image);
        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Houve uma falha ao cadastrar imagem" })
        }
    }



    async destroy(req, res) {

        const { id } = req.body;

        const image = await UserImage.findByPk(id);

        if (!image) return res.status(400).send({ erro: "Imagem do usuario não encontrado" });
        

        const trx = await connection.transaction();


        try {

            await image.destroy();

            await trx.commit()

            fs_unlink(image.key_name);

            return res.send();
        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Houve um erro ao deletar imagem" + error });
        }
    }

}

module.exports = new UserImageController();