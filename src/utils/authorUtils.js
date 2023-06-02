const { author } = require("../db");
const axios = require("axios");
require("dotenv").config();
const authors = require("../../authors.json");

const inyectDbWithAuthors = async () => {
  try {
    const apiHasBeenInyected = await author.findAll();
    if (apiHasBeenInyected.length === 0) {
      // const api = await axios.get("https://www.etnassoft.com/api/v1/get/?book_author");
      // const found = api.data.filter((e) => {
      //     return{
      //         id: e.ID,
      //         name: e.author,
      //         created: false
      //     };
      // });

      const authorsMap = authors.map((e) => {
        return {
          id: e.id,
          name: e.name,
        };
      });

      authorsMap.forEach((e) => {
        author.create({
          id: e.id,
          name: e.name,
        });
      });
    }
  } catch (error) {
    return {
      error: "Error in authorUtils",
    };
  }
};

module.exports = { inyectDbWithAuthors };
