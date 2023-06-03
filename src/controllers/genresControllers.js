const { genre } = require('../db');
const { Op } = require('sequelize');


const getAllGenresDB= async (name) => {
  try {
    let allGenres = await genre.findAll();

    if (name) {
      let genreName = await genre.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        }
      });
      genreName.length
        ? res.status(200).json(genreName)
        : res.status(404).send("The genre was not found in the database");
    } else {
      return res.status(200).json(allGenres);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


module.exports = {
  getAllGenresDB,
};
