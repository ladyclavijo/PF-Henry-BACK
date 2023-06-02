const { book, genre, author, BookGenre } = require("../db");
const axios = require("axios");
const he = require("he");
const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
const books = require("../../books.json");
const genres = require("../../genres.json");

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const inyectDbWithBooks = async () => {
  const apiHasBeenInyected = await book.findAll();
  if (apiHasBeenInyected.length === 0) {
    // const response1 = await axios.get(
    //   "https://www.etnassoft.com/api/v1/get/?category=libros_programacion&criteria=most_viewed&results_range=0,30&json=true"
    // );
    // const response2 = await axios.get(
    //   "https://www.etnassoft.com/api/v1/get/?category=cine&criteria=most_viewed&results_range=0,30&json=true"
    // );
    // const response3 = await axios.get(
    //   "https://www.etnassoft.com/api/v1/get/?category=filosofia&criteria=most_viewed&results_range=0,30&json=true"
    // );
    // const response4 = await axios.get(
    //   "https://www.etnassoft.com/api/v1/get/?category=ensayos_y_novelas&criteria=most_viewed&results_range=0,30&json=true&decode=true"
    // );
    // const response5 = await axios.get(
    //   "https://www.etnassoft.com/api/v1/get/?category=historia&criteria=most_viewed&results_range=0,30&json=true"
    // );
    // const response6 = await axios.get(
    //   "https://www.etnassoft.com/api/v1/get/?category=ciencia&criteria=most_viewed&results_range=0,30&json=true"
    // );
    // const response7 = await axios.get(
    //   "https://www.etnassoft.com/api/v1/get/?category=desarrollo_web&criteria=most_viewed&results_range=0,30&json=true"
    // );
    // const response8 = await axios.get(
    //   "https://www.etnassoft.com/api/v1/get/?category=bases_de_datos&criteria=most_viewed&results_range=0,30&json=true"
    // );
    // const response9 = await axios.get(
    //   "https://www.etnassoft.com/api/v1/get/?category=musica&criteria=most_viewed&results_range=0,30&json=true"
    // );
    // const response10 = await axios.get(
    //   "https://www.etnassoft.com/api/v1/get/?category=comics&criteria=most_viewed&results_range=0,30&json=true"
    // );
    // const response11 = await axios.get(
    //   "https://www.etnassoft.com/api/v1/get/?category=educacion&criteria=most_viewed&results_range=0,30&json=true"
    // );
    // const response12 = await axios.get(
    //   "https://www.etnassoft.com/api/v1/get/?category=marketing&criteria=most_viewed&results_range=0,30&json=true"
    // );

    // const response13 = await axios.get(
    //   "https://www.etnassoft.com/api/v1/get/?category=robotica&criteria=most_viewed&results_range=0,30&json=true"
    // );

    // const apiRaw1 = response1.data;
    // const apiRaw2 = response2.data;
    // const apiRaw3 = response3.data;
    // const apiRaw4 = response4.data;
    // const apiRaw5 = response5.data;
    // const apiRaw6 = response6.data;
    // const apiRaw7 = response7.data;
    // const apiRaw8 = response8.data;
    // const apiRaw9 = response9.data;
    // const apiRaw10 = response10.data;
    // const apiRaw11 = response11.data;
    // const apiRaw12 = response12.data;
    // const apiRaw13 = response13.data;

    // const apiRaw = [
    //   ...apiRaw4,
    //   ...apiRaw12,
    //   ...apiRaw11,
    //   ...apiRaw10,
    //   ...apiRaw9,
    //   ...apiRaw8,
    //   ...apiRaw7,
    //   ...apiRaw6,
    //   ...apiRaw5,
    //   ...apiRaw13,
    //   ...apiRaw3,
    //   ...apiRaw2,
    //   ...apiRaw1,
    // ];
    // let genresToFilter = await genre.findAll();
    let api = books.map((elem) => {
      return {
        title: elem.title,
        author: elem.author,
        cover: elem.cover,
        description: elem.description /*he.decode(elem.content)*/,
        price: elem.pages ? parseInt(elem.pages) * 30.5 : 0,
        publisher: elem.publisher,
        publisher_date: elem.publisher_date,
        pages: elem.pages ? parseInt(elem.pages) : 0,
        language: elem.language,
        stock: true,
        created: false,
        genre: elem.genre,
      };
    });
    api.forEach(async (elem) => {
      const cover = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(elem.cover, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        });
      });
      let newBook = await book.create({
        title: elem.title,
        author: elem.author,
        cover: cover,
        description: elem.description,
        price: elem.price,
        publisher: elem.publisher,
        publisher_date: elem.publisher_date,
        pages: elem.pages,
        language: elem.language,
        stock: true,
        created: false,
      });
      // let filteredCategory = elem.genre
      //   .filter((obj1) =>
      //     genresToFilter.some((obj2) => obj2.id === obj1.category_id)
      //   )
      //   .map((obj) => obj.category_id);
      // await newBook.addGenre(filteredCategory);
      // const authorDB = await author.findOne({
      //   where: {
      //     name: elem.author,
      //   },
      // });
      // // console.log(authorDB.dataValues.id);
      // if (authorDB) {
      //   // await newBook.getAuthor(2);
      //   await newBook.update({
      //     authorId: authorDB.id,
      //   });
      //   await authorDB.update({
      //     bookId: newBook.id,
      //   });
      //   // await author.create({
      //   //   bookId: authorDB.dataValues.id,
      //   // })
      // }
      // const bookIdDB = await book.findOne({
      //   where: {
      //     title: elem.title,
      //   },
      // });
      // const genreDB = await genre.findAll({
      //   where: {
      //     name: elem.genre,
      //   },
      // });
      // genreDB.forEach(async (elem) => {
      //   console.log(elem);
      //   await BookGenre.create({
      //     bookId: bookIdDB.id,
      //     genreId: elem.id,
      //   });
      // });
      // if (genreDB) {
      //   await BookGenre.create({
      //     bookId: bookIdDB.id,
      //     genreId: genreDB.dataValues.id,
      //   });
      // }
      const genresAux = await genre.findAll({
        where: {
          name: elem.genre,
        },
      });
      const genres = genresAux.map((elem) => {
        return elem.id;
      });
      await newBook.addGenre(genres);
      const authorDB = await author.findOne({
        where: {
          name: elem.author,
        },
      });
      const authorToAdd = authorDB.id;
      await newBook.setAuthor(authorToAdd);
    });
  }
};

const getAllGenres = async () => {
  const apiHasBeenInyected = await genre.findAll();
  if (apiHasBeenInyected.length === 0) {
    // const API =
    //   "https://www.etnassoft.com/api/v1/get/?get_categories=all&json=true";
    // const apiRaw = await axios.get(API);
    // const found = apiRaw.data.filter((elem) => {
    //   return (
    //     elem.nicename === "cine" ||
    //     elem.nicename === "libros_programacion" ||
    //     elem.nicename === "filosofia" ||
    //     elem.nicename === "ensayos_y_novelas" ||
    //     elem.nicename === "historia" ||
    //     elem.nicename === "ciencia" ||
    //     elem.nicename === "desarrollo_web" ||
    //     elem.nicename === "bases_de_datos" ||
    //     elem.nicename === "musica" ||
    //     elem.nicename === "comics" ||
    //     elem.nicename === "educacion" ||
    //     elem.nicename === "marketing_y_business" ||
    //     elem.nicename === "robotica"
    //   );
    // });

    const genresMap = genres.map((e) => {
      return {
        id: e.id /*e.category_id*/,
        name: e.name,
      };
    });
    genresMap.forEach((elem) => {
      genre.create({
        id: elem.id,
        name: elem.name,
      });
    });
  }
};

module.exports = {
  inyectDbWithBooks,
  getAllGenres,
};
