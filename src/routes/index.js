const {Router} = require('express');
const bookRouter = require('./booksRoutes');
const genresRouter = require('./genresRoutes');
const authorRouter = require('./authorsRoutes');
const mainRouter = Router();

mainRouter.use('/genres', genresRouter);
mainRouter.use('/books',bookRouter);
mainRouter.use('/authors', authorRouter);


module.exports = mainRouter;