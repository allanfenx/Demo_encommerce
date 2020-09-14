const jwt = require('jsonwebtoken');
const AuuthConfig = require('../Auth.json');

module.exports = (req, res, next) => {

    const token = req.headers.authozation;

    jwt.verify(token, AuuthConfig.secret, (err, decode)=> {

        if(err) return res.status(401).send({erro: "Token iválido"});

        req.userId = decode.id;
        req.role = decode.role;
        req.name = decode.name;
        return next();
    });
}