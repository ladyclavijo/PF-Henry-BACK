require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;
const { Sequelize, or } = require("sequelize");
const books = require("./models/Book.js");
const authors = require("./models/Author.js");
const genres = require("./models/Genre.js");
const users = require("./models/User.js");
const orders = require("./models/Order.js");
const reviews = require("./models/Review.js")


// const database = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/bookbuster`,
//   {
//     logging: false,
//     native: false,
//     force: true,
//   }
// );
const database = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
  force: true,
});

books(database);
authors(database);
genres(database);
users(database);
orders(database);
reviews(database)

const { book, author, genre, user, order, review } = database.models;

user.hasMany(book);
book.belongsTo(user);

user.hasMany(order, { as: 'orders' });
order.belongsTo(user, { foreignKey: 'userId' });

user.hasMany(review)
review.belongsTo(user)

book.hasMany(review)
review.belongsTo(book)

book.belongsToMany(genre, { through: "BookGenre", timestamps: false });
genre.belongsToMany(book, { through: "BookGenre", timestamps: false });

book.hasOne(user);
user.belongsTo(book);

module.exports = {
  ...database.models,
  conn: database,
};
