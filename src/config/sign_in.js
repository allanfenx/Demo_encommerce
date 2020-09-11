const jwt = require('jsonwebtoken');
const AuuthConfig = require('./Auth.json');

module.exports = (req, res, next) => {

    const {token} = req.body;

    jwt.verify(token, AuuthConfig.secret, (err, decode)=> {

        if(err) return res.status(401).send({erro: "Token iválido"});

        req.user_id = decode.id;
        req.role = decode.role
        return next();
    });
}