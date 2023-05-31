const axios = require('axios')

const getAllGenres = async () => {
    const apiRaw = await axios.get(
        "https://www.etnassoft.com/api/v1/get/?get_categories=all&json=true"
      );
      const api = apiRaw.data?.filter((elem)=> 
      elem.nicename === 'cine' || elem.nicename === 'libros_programacion' || elem.nicename === 'filosofia' || elem.nicename === 'ensayos_y_novelas' || elem.nicename === 'historia' || elem.nicename === 'ciencia' || elem.nicename === 'desarrollo_web' ||  elem.nicename === 'bases_de_datos' || elem.nicename === 'musica' || elem.nicename === 'comics' || elem.nicename === 'educacion' || elem.nicename === 'marketing_y_business' || elem.nicename === 'robotica')
      return api;
};

module.exports = {
  getAllGenres,
};
