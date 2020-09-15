const jwt = require('jsonwebtoken');
const Auth = require('../Auth.json');

module.exports = (req, res, next) => {

    const token  = req.headers.authorization;

    jwt.verify(token, Auth.secret, (err, decoded) => {

        if (err) return res.status(405).send({ erro: "Invalid token" });

        req.userID = decoded.id;
        req.role = decoded.role;
        req.name = decoded.name;



        return next();
    })
}