const { getAllGenresDB } = require('../controllers/genresControllers')

const getAllGenresHandler = async (req, res) => {
    try {
      const { name } = req.query;
      const response = await getAllGenresDB(name);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getAllGenresHandler,
}