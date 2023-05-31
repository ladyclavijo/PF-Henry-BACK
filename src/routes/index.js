const {Router} = require('express');
const bookRouter = require('./booksRoutes')
const genresRoutes = require('./genresRoutes')
const mainRouter = Router();

mainRouter.use('/genres',genresRoutes)
mainRouter.use('/books',bookRouter);


module.exports = mainRouter