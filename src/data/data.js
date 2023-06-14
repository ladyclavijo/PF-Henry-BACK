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

module.exports = {
    getOrderAmount,
}