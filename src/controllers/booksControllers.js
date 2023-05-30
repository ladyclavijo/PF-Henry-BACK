require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const getAllBooks = async () => {
  let id = 0;
  let startIndex = 0;
  const maxResults = 40;
  const maxBooks = 280;
  let allBooks = [];

  while (allBooks.length < maxBooks) {
    const apiRaw = (
      await axios.get(
        `https://www.googleapis.com/books/v1/volumes?maxResults=${maxResults}&startIndex=${startIndex}&q=flowers+inauthor:keyes&key=${API_KEY}`
      )
    ).data;
    if (apiRaw.items) {
      const books = apiRaw.items.map((obj) => {
        id++;
        return {
          id: id,
          name: obj.volumeInfo.title,
          image: obj.volumeInfo.imageLinks?.thumbnail,
          price: obj.saleInfo.listPrice?.amount,
        };
      });
      allBooks.push(...books);
    }
    startIndex += maxResults;
  }
  return allBooks;
};
module.exports = {
  getAllBooks,
};
