require("dotenv").config();
const { book, genre, author } = require("../db");
const { Op } = require("sequelize");

const getAllBooks = async () => {
  const response = await book.findAll();
  return response;
};

const getBookById = async (id) => {
  const findBook = await book.findByPk(id, {
    include: [
      {
        model: author,
        attributes: ["name"],
      },
      {
        model: genre,
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

const createBook = async (
  title,
  description,
  cover,
  price,
  publisher,
  publisher_date,
  pages,
  language,
  genres
) => {
  if(!title || !description || !cover || !price || !publisher || !publisher_date || !pages || !language){throw Error('missing data')}
  else{
    const newBook = await book.create({title, description, cover, price, publisher, publisher_date, pages, language})
    await newBook.addGenre(genres)
    return `new book created with the id:${newBook?.id}`
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByTitle,
  createBook
};
