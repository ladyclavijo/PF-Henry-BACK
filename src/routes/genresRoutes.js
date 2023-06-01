const {Router} = require('express')
const genresRouter = Router()
const {getAllGenresDB, getGenreById} = require('../controllers/genresControllers')

genresRouter.get('/genres', getAllGenresDB )
genresRouter.get('/genres/:id', getGenreById)

module.exports = genresRouter
