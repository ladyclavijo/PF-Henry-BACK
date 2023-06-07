const { Router } = require("express");
const bookRouter = Router();
const {
  getAllBooksHandler,
  getBookByIdHandler,
  postBookHandler,
} = require("../handlers/booksHandlers");

bookRouter.get("/", getAllBooksHandler);
bookRouter.get("/:id", getBookByIdHandler);
bookRouter.post("/post", postBookHandler)

module.exports = bookRouter;