require("dotenv").config();
const { book } = require("../db");

const getAllBooks = async () => {
  const response = await book.findAll()
  return response;
};

const getBookById = async (req, res) => {
  const bookId = req.params.id;
  const findBook = await book.findByPk(bookId, {
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
