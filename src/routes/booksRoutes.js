const {Router} = require('express');
const bookRouter = Router()
const {getAllBooksHandler} = require('../handlers/booksHandlers')

bookRouter.get('/',getAllBooksHandler)

module.exports = bookRouter