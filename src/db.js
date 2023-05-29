require("dotenv").config();
const {URI} = process.env;
const {Sequelize} = require('sequelize');
const database = new Sequelize(URI);

module.exports = {database}