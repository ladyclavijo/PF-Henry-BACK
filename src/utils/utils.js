const { book, genre, author } = require("../db");
const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
const books = require("../../books.json");

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const inyectDbWithBooks = async () => {
  const apiHasBeenInyected = await book.findAll();
  if (apiHasBeenInyected.length === 0) {
    let api = books.map((elem) => {
      return {
        title: elem.title,
        description: elem.description,
        cover: elem.cover,
        author: elem.author,
        genre: elem.genre,
        price: elem.pages ? parseInt(elem.pages) * 30.5 : 0,
        publisher: elem.publisher,
        publisher_date: elem.publisher_date,
        pages: elem.pages ? parseInt(elem.pages) : 0,
        language: elem.language,
        stock: true,
        created: false,
      };
    });
    api.forEach(async (elem) => {
      const cover = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(elem.cover, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        });
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
        stock: true,
        created: false,
      });
      console.log(newBook.title);
      const authorsDB = newBook.author;
      if (authorsDB.length > 1) {
        for (const e of authorsDB) {
          await author.findOrCreate({
            where: {
              name: e,
            },
          });
        }
      } else {
        await author.findOrCreate({
          where: {
            name: authorsDB[0],
          },
        });
      }

      const genresDB = newBook.genre;
      if (genresDB.length > 1) {
        for (const e of genresDB) {
          await genre.findOrCreate({
            where: {
              name: e,
            },
          });
        }
      } else {
        await genre.findOrCreate({
          where: {
            name: genresDB[0],
          },
        });
      }
    });
  }
};

module.exports = {
  inyectDbWithBooks,
};
