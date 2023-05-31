require("dotenv").config();
const { book } = require("../db");

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

module.exports = {
  getAllBooks,
  getBookById,
};
