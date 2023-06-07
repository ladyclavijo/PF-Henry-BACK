const { book, genre, author } = require("../db");
const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
const books = require("../../books.json");
const genres = require("../../genres.json");

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const inyectDbWithGenres = async () => {
  const apiHasBeenInyected = await genre.findAll();
  if (apiHasBeenInyected.length === 0) {
    let api = genres.map((elem) => {
      return {
        id: elem.id,
        name: elem.name,
      };
    });
    api.forEach(async (elem) => {
      await genre.create({
        id: elem.id,
        name: elem.name,
      });
    });
  }
};

const inyectDbWithBooks = async () => {
  const apiHasBeenInyected = await book.findAll();
  if (apiHasBeenInyected.length === 0) {
    let api = books.map((elem) => {
      return {
        title: elem.title,
        description: elem.description,
        cover: elem.cover,
        author: elem.author,
        genres: elem.genre,
        price: elem.pages ? parseInt(elem.pages) * 0.03 : 0,
        publisher: elem.publisher,
        publisher_date: elem.publisher_date,
        pages: elem.pages ? parseInt(elem.pages) : 0,
        language: elem.language,
        stock: 10,
      };
    });
    api.forEach(async (elem) => {
      const cover = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          elem.cover,
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
      let newBook = await book.create({
        title: elem.title,
        cover: cover,
        author: elem.author,
        genre: elem.genre,
        description: elem.description,
        price: elem.price,
        publisher: elem.publisher,
        publisher_date: elem.publisher_date,
        pages: elem.pages,
        language: elem.language,
        stock: 10,
      });
      await newBook.addGenre(elem.genres);
    });
  }
};

module.exports = {
  inyectDbWithBooks,
  inyectDbWithGenres,
};
