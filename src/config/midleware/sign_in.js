const jwt = require('jsonwebtoken');
const Auth = require('../Auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send({ erro: "No token provided" });

    const parts = authHeader.split(' ');

    if (!parts.length === 2) return res.status(401).send({ erro: "Token error" });

    const [schema, token] = parts;

    if(!/^Bearer$/i.test(schema)) return res.status(401).send({ erro: "Token malformatted" });

    jwt.verify(token, Auth.secret, (err, decoded) => {

        if (err) return res.status(401).send({ erro: "Invalid token" });

        req.userID = decoded.id;
        req.role = decoded.role;
        req.name = decoded.name;



        return next();
    })
}