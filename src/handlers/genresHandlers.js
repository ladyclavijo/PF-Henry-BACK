const { getAllGenresDB /*, getGenreById*/} = require('../controllers/genresControllers')

const getAllGenresHandler = async (req, res) => {
    try {
      const { name } = req.query;
      const response = await getAllGenresDB(name);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

// const getGenreByIdHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const response = await getGenreById(id);
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }

module.exports = {
    getAllGenresHandler,
    // getGenreByIdHandler
}