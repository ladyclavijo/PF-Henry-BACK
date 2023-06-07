const { Router } = require("express");
const bookRouter = Router();
const {
  getAllBooksHandler,
  getBookByIdHandler,
  postBookHandler,
  updateBookHandler,
} = require("../handlers/booksHandlers");

bookRouter.get("/", getAllBooksHandler);
bookRouter.get("/:id", getBookByIdHandler);
bookRouter.put("/:id", updateBookHandler);
bookRouter.post("/post", postBookHandler);

module.exports = bookRouter;
