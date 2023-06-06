require("dotenv").config();
const { book, genre} = require("../db");
const { Op } = require("sequelize");

const getAllBooks = async () => {
  const response = await book.findAll({include:{
    model: genre,
    attributes:["name"],
    through:{
        attributes:[]
    },
}});
  return response;
};

const getBookById = async (id) => {
  const findBook = await book.findByPk(id,{include:{
    model: genre,
    attributes:["name"],
    through:{
        attributes:[]
    },
}});
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
  genre,
  author
) => {
  if (
    !title ||
    !description ||
    !cover ||
    !price ||
    !publisher ||
    !publisher_date ||
    !pages ||
    !language||!author
  ) {
    throw Error("missing data");
  } else {
    const newBook = await book.create({
      title,
      description,
      cover,
      price,
      publisher,
      publisher_date,
      pages,
      language,
      author,
    });
    await newBook.addGenre(genre);
    return `new book created with the id:${newBook?.id}`;
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByTitle,
  createBook,
};
