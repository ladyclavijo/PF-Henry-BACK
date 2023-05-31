const {Router} = require('express')
const authorRouter = Router()
const {getAllAuthorsHandler} = require('../handlers/authorsHandlers')

authorRouter.get('/', getAllAuthorsHandler)

module.exports = authorRouter