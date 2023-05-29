const {Router} = require('express');
const bookRouter = require('./booksRoutes')
const mainRouter = Router();


mainRouter.use('/books',bookRouter);


module.exports = mainRouter