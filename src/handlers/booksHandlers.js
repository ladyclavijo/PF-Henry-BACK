const {
  getAllBooks,
  getBookById,
  getBooksByTitle,
  createBook,
  updateBook,
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
  const id = req.params.id;
  try {
    const response = await getBookById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postBookHandler = async (req, res) => {
  const {
    title,
    description,
    cover,
    price,
    publisher,
    publisher_date,
    pages,
    language,
    genres,
    author,
  } = req.body;
  try {
    const response = await createBook(
      title,
      description,
      cover,
      price,
      publisher,
      publisher_date,
      pages,
      language,
      genres,
      author,
      stock
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBookHandler = async (req, res) => {
  const {
    id,
    title,
    description,
    cover,
    price,
    publisher,
    publisher_date,
    pages,
    language,
    genres,
    author,
    stock,
  } = req.body;
  try {
    const response = await updateBook(
      id,
      title,
      description,
      cover,
      price,
      publisher,
      publisher_date,
      pages,
      language,
      genres,
      author,
      stock
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
};
