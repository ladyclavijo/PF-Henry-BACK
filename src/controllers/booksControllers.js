require("dotenv").config();
const { book, genre} = require("../db");
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
    !language ||
    !author ||
    !genre
  ) {
    throw Error("missing data");
  } else {
    const newCover = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(cover, { folder: "PF-BookBuster" }, (error, result) => {
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
