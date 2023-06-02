const {Router} = require("express");
const authorRouter = Router();
const {
    getAllAuthorsHandler,
    getAuthorByIdHandler
} = require("../handlers/authorsHandlers");

authorRouter.get("/", getAllAuthorsHandler);
authorRouter.get("/:id", getAuthorByIdHandler);

module.exports = authorRouter;