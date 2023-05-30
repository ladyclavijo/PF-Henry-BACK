const {getAllBooks} = require('../controllers/booksControllers')

const getAllBooksHandler = async (req,res) =>{
    try {
        const response = await getAllBooks()
        res.status(200).send(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getAllBooksHandler
}