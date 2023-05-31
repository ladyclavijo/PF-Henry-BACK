const {getAllAuthors} = require("../controllers/authorsControllers")

const getAllAuthorsHandler = async (req, res) => {
    try {
        const response = await getAllAuthors()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
};

module.exports = getAllAuthorsHandler;