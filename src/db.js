require("dotenv").config();
const { URI } = process.env;
const { Sequelize } = require("sequelize");
const books = requiere("./models/Book.js");
const authors = requiere("./models/Author.js");
const genres = requiere("./models/Genre.js");
const users = requiere("./models/User.js");

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
