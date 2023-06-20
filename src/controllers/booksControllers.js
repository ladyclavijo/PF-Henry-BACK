require("dotenv").config();
const { book, genre, review, user } = require("../db");
const { Op, Sequelize } = require("sequelize");
const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const getAllBooks = async () => {
  const response = await book.findAll({
    include: {
      model: genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return response;
};

const getBookById = async (id) => {
  const findBook = await book.findByPk(id, {
    include: [
      {
        model: genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: review,
        attributes: { exclude: ["bookId"] },
        include: {
          model: user,
          attributes: ["username"],
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

const getBooksByAuthor = async (author) => {
  const books = await book.findAll({
    where: Sequelize.where(
      Sequelize.fn("array_to_string", Sequelize.col("author"), ","),
      {
        [Op.iLike]: `%${author}%`,
      }
    ),
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
  author,
  stock,
  userId
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
    !genre ||
    !stock ||
    !userId
  ) {
    throw Error("missing data in createBook");
  } else {
    const newCover = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        cover,
        { folder: "PF-BookBuster" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );
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
      stock,
      userId,
    });
    await newBook.addGenre(genre);
    return `new book created with the id:${newBook?.id}`;
  }
};

const updateBook = async (id, updateData) => {
  if (!id || !updateData) {
    throw Error("missing data in updateBook");
  } else {
    const bookToUpdate = await book.findByPk(id);
    if (!bookToUpdate) {
      throw Error(`Book with id:${id} not found`);
    }

    const updatedBookData = {};

    if (updateData.title) {
      updatedBookData.title = updateData.title;
    }
    if (updateData.description) {
      updatedBookData.description = updateData.description;
    }
    if (updateData.cover) {
      updatedBookData.cover = updateData.cover;
    }
    if (updateData.price) {
      updatedBookData.price = updateData.price;
    }
    if (updateData.publisher) {
      updatedBookData.publisher = updateData.publisher;
    }
    if (updateData.publisher_date) {
      updatedBookData.publisher_date = updateData.publisher_date;
    }
    if (updateData.pages) {
      updatedBookData.pages = updateData.pages;
    }
    if (updateData.language) {
      updatedBookData.language = updateData.language;
    }
    if (updateData.genre) {
      updatedBookData.genre = updateData.genre;
    }
    if (updateData.author) {
      updatedBookData.author = updateData.author;
    }
    if (updateData.stock !== undefined) {
      if (updateData.stock < 0) {
        throw Error("Stock must be greater than zero");
      }
      updatedBookData.stock = updateData.stock;
    }
    if (updateData.cover) {
      updatedBookData.cover = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          updateData.cover,
          { folder: "PF-BookBuster" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );
      });
    }

    await book.update(updatedBookData, {
      where: {
        id: id,
      },
    });

    return `Book updated with the id:${id}`;
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByTitle,
  getBooksByAuthor,
  createBook,
  updateBook,
};
