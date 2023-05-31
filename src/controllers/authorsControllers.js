const axios = require("axios");

const getAllAuthors = async() => {
    const urlAuthors = await axios.get("https://www.etnassoft.com/api/v1/get/?book_author");
    const apiData = urlAuthors.data.map(e => {

        return {
            id: e.id,
            name: e.author,
            createdDB: false
        };
    })

    return apiData;
};

module.exports = getAllAuthors;