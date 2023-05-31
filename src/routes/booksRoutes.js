const { Router } = require("express");
const bookRouter = Router();
const {
  getAllBooksHandler,
  getBookByIdHandler,
} = require("../handlers/booksHandlers");

bookRouter.get("/", getAllBooksHandler);
bookRouter.get("/book_detail/:id", getBookByIdHandler);

module.exports = bookRouter;
