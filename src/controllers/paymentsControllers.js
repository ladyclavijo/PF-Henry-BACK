const { order } = require("../db");
const {amountByGenre} = require("../data/data");
const { response } = require("express");

const getOrdersByAmountSell = async () => {
  const responseDb = await order.findAll();
  const data = [];
  responseDb.forEach((element) => {
    data.push(element.items);
  });
  const cleanData = data
    .flat()
    .filter((elem) => !elem.hasOwnProperty("total"))
    .reduce((acc, current) => {
      const existingItem = acc.find((item) => item.id === current.id);
      if (existingItem) {
        existingItem.qty += current.qty;
      } else {
        acc.push(current);
      }
      return acc;
    }, [])
    .sort((a, b) => {
      return b.qty - a.qty;
    });

  const totalRevenue = data
    .flatMap((arr) => arr.filter((item) => item.hasOwnProperty("total")))
    .reduce((acc, current) => {
      return acc + current.total;
    }, 0);
  const formattedTotal = (totalRevenue / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const cleanDataWithoutEmptyObj = cleanData.filter((element) => element.hasOwnProperty("id"))
  const revenueByCategory = await amountByGenre(cleanDataWithoutEmptyObj )

  return { totalRevenue: Number(formattedTotal), revenueByCategory ,bestSellers: cleanDataWithoutEmptyObj };
};


const getAllOrders = async () =>{
  const rawOrder = await order.findAll({})
  rawOrder.forEach(obj => {
    let totalCount = 0;
    obj.items.forEach(item => {
      if (item.hasOwnProperty("qty")) {
        totalCount += item.qty;
      }
    });
    obj.items[obj.items.length - 1].totalItems = totalCount
    obj.items[obj.items.length - 1].total = Number(obj.items[obj.items.length - 1].total) / 100;
  });
  return rawOrder
}
module.exports = {
  getOrdersByAmountSell,
  getAllOrders
};
