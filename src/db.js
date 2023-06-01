require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;
const { Sequelize } = require("sequelize");
const books = require("./models/Book.js");
const authors = require("./models/Author.js");
const genres = require("./models/Genre.js");
const users = require("./models/User.js");

// const database = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/bookbuster`,
//   {
//     logging: false,
//     native: false,
//   }
// );
const database = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
});

books(database);
authors(database);
genres(database);
users(database);

const { book, author, genre, user } = database.models;

user.hasMany(book);
book.hasOne(user);

author.hasMany(book);
book.hasOne(author);

book.belongsToMany(genre, { through: "BookGenre", timestamps: false });
genre.belongsToMany(book, { through: "BookGenre", timestamps: false });

module.exports = {
  ...database.models,
  conn: database,
};
