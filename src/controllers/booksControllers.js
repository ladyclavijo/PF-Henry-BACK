require("dotenv").config();
const axios = require("axios");
const he = require("he");
const { book } = require("../db");

const getAllBooks = async () => {
  const response1 = await axios.get(
    "https://www.etnassoft.com/api/v1/get/?category=libros_programacion&criteria=most_viewed&results_range=0,30&json=true"
  );
  const response2 = await axios.get(
    "https://www.etnassoft.com/api/v1/get/?category=cine&criteria=most_viewed&results_range=0,30&json=true"
  );
  const response3 = await axios.get(
    "https://www.etnassoft.com/api/v1/get/?category=filosofia&criteria=most_viewed&results_range=0,30&json=true"
  );
  const response4 = await axios.get(
    "https://www.etnassoft.com/api/v1/get/?category=ensayos_y_novelas&criteria=most_viewed&results_range=0,30&json=true&decode=true"
  );
  const response5 = await axios.get(
    "https://www.etnassoft.com/api/v1/get/?category=historia&criteria=most_viewed&results_range=0,30&json=true"
  );
  const response6 = await axios.get(
    "https://www.etnassoft.com/api/v1/get/?category=ciencia&criteria=most_viewed&results_range=0,30&json=true"
  );
  const response7 = await axios.get(
    "https://www.etnassoft.com/api/v1/get/?category=desarrollo_web&criteria=most_viewed&results_range=0,30&json=true"
  );
  const response8 = await axios.get(
    "https://www.etnassoft.com/api/v1/get/?category=bases_de_datos&criteria=most_viewed&results_range=0,30&json=true"
  );
  const response9 = await axios.get(
    "https://www.etnassoft.com/api/v1/get/?category=musica&criteria=most_viewed&results_range=0,30&json=true"
  );
  const response10 = await axios.get(
    "https://www.etnassoft.com/api/v1/get/?category=comics&criteria=most_viewed&results_range=0,30&json=true"
  );
  const response11 = await axios.get(
    "https://www.etnassoft.com/api/v1/get/?category=educacion&criteria=most_viewed&results_range=0,30&json=true"
  );
  const response12 = await axios.get(
    "https://www.etnassoft.com/api/v1/get/?category=marketing&criteria=most_viewed&results_range=0,30&json=true"
  );

  const response13 = await axios.get(
    "https://www.etnassoft.com/api/v1/get/?category=robotica&criteria=most_viewed&results_range=0,30&json=true"
  );

  const apiRaw1 = response1.data;
  const apiRaw2 = response2.data;
  const apiRaw3 = response3.data;
  const apiRaw4 = response4.data;
  const apiRaw5 = response5.data;
  const apiRaw6 = response6.data;
  const apiRaw7 = response7.data;
  const apiRaw8 = response8.data;
  const apiRaw9 = response9.data;
  const apiRaw10 = response10.data;
  const apiRaw11 = response11.data;
  const apiRaw12 = response12.data;
  const apiRaw13 = response13.data;

  const apiRaw = [
    ...apiRaw4,
    ...apiRaw12,
    ...apiRaw11,
    ...apiRaw10,
    ...apiRaw9,
    ...apiRaw8,
    ...apiRaw7,
    ...apiRaw6,
    ...apiRaw5,
    ...apiRaw13,
    ...apiRaw3,
    ...apiRaw2,
    ...apiRaw1,
  ];
  let api = apiRaw.map((elem) => {
    return {
      id: elem.ID,
      title: elem.title,
      author: elem.author,
      cover: elem.cover,
      description: he.decode(elem.content),
      price: `$${parseInt(elem.pages) * 30.5}`,
      publisher: elem.publisher,
      publisher_date: elem.publisher_date,
      pages: elem.pages,
      language: elem.language,
      stock: true,
      created: false,
      genres: elem.categories,
    };
  });
  return api;
};

const getBookById = async (req, res) => {
  const bookId = req.params.id;
  const findBook = await book.findByPk(bookId, {
    include: [
      {
        model: Author,
        attributes: ["name"],
        through: {
          attributes: [],
        },
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return findBook;
};

module.exports = {
  getAllBooks,
  getBookById,
};
