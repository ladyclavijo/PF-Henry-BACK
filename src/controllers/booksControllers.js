require("dotenv").config();
const { book } = require("../db");
const { Op } = require("sequelize");
const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const getAllBooks = async () => {
  const response = await book.findAll();
  return response;
};

const getBookById = async (id) => {
  const findBook = await book.findByPk(id);
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
  author,
  genre
) => {
  if (
    !title ||
    !description ||
    !cover ||
    !price ||
    !publisher ||
    !publisher_date ||
    !pages ||
    !language ||
    !author ||
    !genre
  ) {
    throw Error("missing data");
  } else {
    const newCover = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(cover, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });
    });
    const newBook = await book.create({
      title,
      description,
      cover: newCover,
      price,
      publisher,
      publisher_date,
      pages,
      language,
      author,
      genre,
    });
    return `new book created with the id:${newBook?.id}`;
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByTitle,
  createBook,
};
