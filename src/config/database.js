require('dotenv').config();

module.exports = {
    dialect: "mysql",
    host: process.env.HOST,
    username: process.env.USERS,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    define: {
        timestamps: false,
    }
}