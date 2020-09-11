const nodemailer = require('nodemailer');
//require('dotenv').config();

var transport = nodemailer.createTransport({
    host: process.env.SMTP,
    port: process.env.PORT,
    auth: {
        user: process.env.USSER,
        pass: process.env.PASS
    }
});


module.exports = transport;