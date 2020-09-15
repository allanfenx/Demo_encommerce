const User = require('../models/User');
const RecoverPassword = require('../models/RecoverPassword');
const connection = require('../database/connection');
const Auth = require('../config/Auth.json');
const mailer = require('../config/NodeMailer');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class UserController {

    async store(req, res) {

        const { name, email, password, repeat_password } = req.body;

        var user = await User.findOne({ where: { email } });

        if (user) return res.status(405).send({ erro: "Já existe um usuario cadastrado com este email" });

        const trx = await connection.transaction();

        const hash = await bcrypt.hash(password, 10);

        try {

            user = await User.create({ name, email, password: hash });

            await trx.commit();

            user.password = undefined;

            return res.send(user);
        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Houve um erro ao fazer cadastro tente outra vez" });
        }
    }

    async auth(req, res) {

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(400).sen({ erro: "User not found" });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ erro: "Ivalid password" });

        const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, Auth.secret, {
            expiresIn: 6000
        });

        user.password = undefined;

        return res.send({user, token});
    }

    async forgotPassword(req, res) {

        const { email } = req.body;

        var user = await User.findOne({ where: { email } });

        if (!user) return res.status(400).send({ erro: "Usuario não encontrado" });

        const token = crypto.randomBytes(100).toString("hex");

        const now = new Date();
        now.setHours(now.getHours() + 1);

        const trx = await connection.transaction();

        try {

            user = await RecoverPassword.create({
                user_id: user.id,
                passwordResetToken: token,
                passwordResetExpire: now
            });



            mailer.sendMail({

                from: "fenxgames@hotmail.com",
                to: email,
                subject: "recuperação de senha",
                html: `<p>Você esqueceu sua senha não tem problema use este token: ${token}`
            }, (err) => {

                if (err) return res.status(400).send({ erro: "Cannot send forgot password email" });

                return res.send({ token });
            });

            await trx.commit();

        } catch (error) {

            await trx.rollback();

            return res.status(400).send({ erro: "Houve um erro ao gerar token" });
        }
    }

    async resetPassword(req, res) {

        const { email, token, password, repeat_password } = req.body;

        var user = await User.findOne({
            where:
                { email }
        });

        if (!user) return res.status(400).send({ erro: "Usuario não encontrado" });

        const userToken = await RecoverPassword.findOne({ where: { passwordResetToken: token } });

        if (token !== userToken.passwordResetToken) return res.status(400).send({ erro: "Os tokens não são iguais" })

        const now = new Date();

        if (now > userToken.passwordResetExpire)
            return res.status(405).send({ erro: "Token expirado crie um novo agora para recuperar sua senha" })

        if (!password) {
            return res.status(405).send({ erro: "O campo password é obrigatório" });
        } else if (password !== repeat_password) {
            return res.status(405).send({ erro: "Confirme sua sennha para recupera-la" });
        }

        var hash = await bcrypt.hash(password, 10);

        user.password = hash;

        const trx = await connection.transaction();

        try {

            await user.save();

            await trx.commit();

            return res.send()
        } catch (error) {

            return res.status(405).send({ erro: "Reset Password fail try again" });

        }


    }
}

module.exports = new UserController();