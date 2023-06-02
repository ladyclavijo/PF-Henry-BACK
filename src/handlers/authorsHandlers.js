const {
  getAllAuthors,
  getAuthorsById,
  getAuthorsByName,
 } = require("../controllers/authorsControllers");

const getAllAuthorsHandler = async (req, res) => {
  const { author } = req.query;
  try {
    if (author) {
    const response = await getAuthorsByName(author);
    res.status(200).json(response);
    } else {
      const response = await getAllAuthors();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAuthorByIdHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await getAuthorsById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({error: error.message});    
  }
};

module.exports = {
  getAllAuthorsHandler,
  getAuthorByIdHandler
 };