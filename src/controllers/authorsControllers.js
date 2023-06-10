const { author, book } = require("../db");

const getAllAuthors = async () => {
  const allBooks = await book.findAll();
  if (allBooks.length) {
    const uniqueAuthors = [...new Set(allBooks.map((b) => b.author[0]))];
    const allAuthors = uniqueAuthors.map((authorName) => {
      return {
        name: authorName,
      };
    });
    await author.bulkCreate(allAuthors);
    const response = await author.findAll();
    return response;
  } else {
    const response = await author.findAll();
    return response;
  }
};
module.exports = {
  getAllAuthors,
};
