require("dotenv").config();

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const PORT_DB = process.env.PORT_DB;
const DATABASE = process.env.DATABASE;

module.exports = {
    development:{
        username: USER,
        password: PASSWORD,
        database: DATABASE,
        host: HOST,
        dialect: "postgres"
    },
    production:{
        username: USER,
        password: PASSWORD,
        database: DATABASE,
        host: HOST,
        dialect: "postgres"
    }
}