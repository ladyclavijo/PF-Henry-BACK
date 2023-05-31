require("dotenv").config();
const { book } = require("../db");
const { Op } = require("sequelize");

const getAllBooks = async () => {
  const response = await book.findAll();
  return response;
};

const getBookById = async (id) => {
  const findBook = await book.findByPk(id, {
    include: [
      {
        model: Author,
        attributes: ["name"],
        through: {
          attributes: [],
        },
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return findBook;
};

const getBooksByTitle = async (title) => {
  const books = await book.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    },
  });
  if (!books.length) {
    throw Error("There is no book with that name");
  }
  return books;
};

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByTitle,
};
