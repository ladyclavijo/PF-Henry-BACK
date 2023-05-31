const {
  getAllBooks,
  getBookById,
  getBooksByTitle,
} = require("../controllers/booksControllers");

const getAllBooksHandler = async (req, res) => {
  const { title } = req.query;
  try {
    if (title) {
      const response = await getBooksByTitle(title);
      res.status(200).json(response);
    } else {
      const response = await getAllBooks();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getBookByIdHandler = async (req, res) => {
  try {
    const response = await getBookById();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllBooksHandler,
  getBookByIdHandler,
};
