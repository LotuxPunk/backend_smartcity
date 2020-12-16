require("dotenv").config();
const process = require("process");
const {Sequelize} = require('sequelize');
const connectionString = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const sequelize = new Sequelize(connectionString);

module.exports = sequelize;