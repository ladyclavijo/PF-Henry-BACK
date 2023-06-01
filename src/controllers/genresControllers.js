const axios = require('axios')
const { genre } = require('../db');

const getAllGenres = async (req, res) => {

    const API = "https://www.etnassoft.com/api/v1/get/?get_categories=all&json=true"
    const apiRaw = await axios.get(API);
    const found = apiRaw.data.filter((elem) => { 
      return elem.nicename === 'cine' || elem.nicename === 'libros_programacion' || elem.nicename === 'filosofia' || elem.nicename === 'ensayos_y_novelas' || elem.nicename === 'historia' || elem.nicename === 'ciencia' || elem.nicename === 'desarrollo_web' ||  elem.nicename === 'bases_de_datos' || elem.nicename === 'musica' || elem.nicename === 'comics' || elem.nicename === 'educacion' || elem.nicename === 'marketing_y_business' || elem.nicename === 'robotica'
    })
    
    const genresMap =  found.map((e) => e.name)

    for (const name of genresMap) {
      await genre.findOrCreate({ where: { name } });
    }
      
    const genresDb = await genre.findAll()
    return genresDb;
    
};


const getAllGenresDB= async (req, res) => {
  try {
    const { name } = req.query;
    let allGenres = await getAllGenres();

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
}

const getGenreById = async (req, res) => {
    try {
        const { id } = req.params;

        const genresDb = await genre.findByPk(id);
        if (!genresDb) {
            return res
                .status(404)
                .json({ message: 'The genre was not found in the database' });
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
