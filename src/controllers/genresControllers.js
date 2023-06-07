const { genre } = require("../db");

const getAllGenresDB = async (req, res) => {
  try {
    const { name } = req.query;
    let allGenres = await genre.findAll({
      attributes: ["id", "name"],
    });

    if (name) {
      let genreName = allGenres.filter((genre) =>
        genre.name.toLowerCase().includes(name.toLowerCase())
      );
      genreName.length
        ? res.status(200).json(genreName)
        : res.status(404).send("The genre was not found in the database");
    } else {
      return res.status(200).json(allGenres);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getGenreById = async (req, res) => {
  try {
    const { id } = req.params;

    const genresDb = await genre.findByPk(id);
    if (!genresDb) {
      return res
        .status(404)
        .json({ message: "The genre was not found in the database" });
    }
    return res.status(200).json(genresDb);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGenresDB,
  getGenreById,
};
