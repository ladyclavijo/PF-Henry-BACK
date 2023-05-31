require("dotenv").config();
const { URI } = process.env;
const { Sequelize } = require("sequelize");
const books = require("./models/Book.js");
const authors = require("./models/Author.js");
const genres = require("./models/Genre.js");
const users = require("./models/User.js");

const database = new Sequelize(URI);

books(database);
authors(database);
genres(database);
users(database);

const { book, author, genre, user } = database.models;

module.exports = {
  ...database.models,
  database,
};
