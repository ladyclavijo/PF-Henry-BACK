const { getAllBooks, getBookById } = require("../controllers/booksControllers");

const getAllBooksHandler = async (req, res) => {
  try {
    const response = await getAllBooks();
    res.status(200).json(response);
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
