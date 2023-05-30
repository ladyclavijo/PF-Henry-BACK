require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const getAllBooks = async () => {
  const apiRaw = (
    await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${API_KEY}`
    )
  ).data;
  return apiRaw;
};
module.exports = {
  getAllBooks,
};
