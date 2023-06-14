const { order } = require("../db");

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
  return { bestSellers: cleanData, totalRevenue: Number(formattedTotal) };
};

module.exports = {
  getOrdersByAmountSell,
};
