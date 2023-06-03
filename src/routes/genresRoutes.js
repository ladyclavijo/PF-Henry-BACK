const { Router } = require("express");
const genresRouter = Router();
const { getAllGenresHandler/*, getGenreByIdHandler */ } = require('../handlers/genresHandlers');

genresRouter.get("/", getAllGenresHandler);
// genresRouter.get("/:id", getGenreByIdHandler);

module.exports = genresRouter;
