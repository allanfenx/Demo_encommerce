const jwt = require('jsonwebtoken');
const AuuthConfig = require('../Auth.json');

module.exports = (req, res, next) => {

    const token = req.body;
    //const token = req.headers.authorization;

    jwt.verify(token, AuuthConfig.secret, (err, decode)=> {

        if(err) return res.status(401).send({erro: "Token iválido"});

        req.userId = decode.id;
        req.role = decode.role;
        req.name = decode.name;

        if(req.role !== "admin") return res.status(405).send({erro: "Não autorizado"});

        return next();
    });
}