const { Router } = require("express");
const bookRouter = require("./booksRoutes");
const genresRouter = require("./genresRoutes");
const authorRouter = require("./authorsRoutes");
const paymentRoute = require("./paymentsRoutes");
const userRouter = require("./usersRoutes");
const mainRouter = Router();

mainRouter.use(genresRouter);
mainRouter.use("/books", bookRouter);
mainRouter.use("/authors", authorRouter);
mainRouter.use("/payments", paymentRoute);
mainRouter.use("/register", userRouter);

module.exports = mainRouter;
