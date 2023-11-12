require('dotenv').config();
const {Sequelize} = require('sequelize');
const {setupModels} = require('../db/models');

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const HOST = process.env.HOST;
const PORT_DB = process.env.PORT_DB;
const DATABASE = process.env.DATABASE;
const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT_DB}/${DATABASE}`;

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true,
});

setupModels(sequelize);
module.exports = sequelize;