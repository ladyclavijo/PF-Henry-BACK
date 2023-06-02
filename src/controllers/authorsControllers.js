const { author, book } = require("../db");
const Sequelize = require("sequelize");
const op = Sequelize.Op;

const getAllAuthors = async() => {
  const response = await author.findAll()
  return response;
};

const getAuthorsById = async(id) => {
  try {
    const findAuthor = await author.findByPk(id, {
      include: [
        {
          model: book,
          attributes: ["name"],
          through: {
            attributes: []
          }
        }
      ]
    })
    return findAuthor;
     
  } catch (error) {
    return error    
  }
};

const getAuthorsByName = async(name) => {
  try {
    const dbAuthors = await author.findOne({
      where: { name: { [op.iLike]:`%${name}%`}},
      include: [{
        model: book,
        attributes: ["name"],
        through: {
          attributes: []
        }
      }]
    });
    return dbAuthors;
  } catch (error) {
    return error    
  }
};


module.exports = {
  getAllAuthors,
  getAuthorsById,
  getAuthorsByName
};