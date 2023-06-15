const {getBookById} = require('../controllers/booksControllers')

const getOrderAmount = async (items) =>{
    let amount = 0
    for(let i = 0; i < items.length; i++){
        const item = items[i]
        const itemDb = await getBookById(item.id)
        let operation = itemDb.price * item.qty;
        amount += operation
    }
    const onlyTwoDecimals = amount.toFixed(2)   
    const parseAmount = parseInt(onlyTwoDecimals.replace('.',''),10)
    return { parseAmount , cover: itemDb.cover}
}

const amountByGenre = async (items) => {
    let aux = [];
    for (const element of items) {
      let infodb = await getBookById(element.id);
      let response = {
        id: infodb.id,
        total: (element.qty * infodb.price).toFixed(2),
        genres: infodb.genres[0].name
      }
      aux.push(response)
    }

    const revenue = {
        fiction: aux.filter(element => element.genres === "Ficción").reduce((acc, current) => {
            return Number(acc) + Number(current.total);
          }, 0),
        science: aux.filter(element => element.genres === "Ciencia").reduce((acc, current) => {
            return Number(acc) + Number(current.total);
          }, 0),
        economy: aux.filter(element => element.genres === "Economía").reduce((acc, current) => {
            return Number(acc) + Number(current.total);
          }, 0),
        math: aux.filter(element => element.genres === "Matemática").reduce((acc, current) => {
            return Number(acc) + Number(current.total);
          }, 0),
        criminology: aux.filter(element => element.genres === "Criminología").reduce((acc, current) => {
            return Number(acc) + Number(current.total);
          }, 0),
        biography: aux.filter(element => element.genres === "Biografía").reduce((acc, current) => {
            return Number(acc) + Number(current.total);
          }, 0),
        computing: aux.filter(element => element.genres === "Computación").reduce((acc, current) => {
            return Number(acc) + Number(current.total);
          }, 0),
        history: aux.filter(element => element.genres === "Historia").reduce((acc, current) => {
            return Number(acc) + Number(current.total);
          }, 0),
        literature: aux.filter(element => element.genres === "Literatura").reduce((acc, current) => {
            return Number(acc) + Number(current.total);
          }, 0),
        fantasy: aux.filter(element => element.genres === "Fantasía").reduce((acc, current) => {
            return Number(acc) + Number(current.total);
          }, 0),
    }
    return revenue
  };

module.exports = {
    getOrderAmount,
    amountByGenre
}