const { getBookById } = require("../controllers/booksControllers");

const getOrderAmount = async (items) => {
  let amount = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemDb = await getBookById(item.id);
    let operation = itemDb.price * item.qty;
    amount += operation;
  }
  const onlyTwoDecimals = amount.toFixed(2);
  const parseAmount = parseInt(onlyTwoDecimals.replace(".", ""), 10);
  return parseAmount;
};

const amountByGenre = async (items) => {
  let aux = [];
  for (const element of items) {
    let infodb = await getBookById(element.id);
    let response = {
      id: infodb.id,
      total: (element.qty * infodb.price).toFixed(2),
      genres: infodb.genres[0].name,
    };
    aux.push(response);
  }

  const revenue = {
    fiction: aux
      .filter((element) => element.genres === "Ficción")
      .reduce((acc, current) => {
        return Number(acc) + Number(current.total);
      }, 0),
    non_fiction: aux
      .filter((element) => element.genres === "No Ficción")
      .reduce((acc, current) => {
        return Number(acc) + Number(current.total);
      }, 0),
    mystery: aux
      .filter((element) => element.genres === "Misterio")
      .reduce((acc, current) => {
        return Number(acc) + Number(current.total);
      }, 0),
    narrative: aux
      .filter((element) => element.genres === "Narrativo")
      .reduce((acc, current) => {
        return Number(acc) + Number(current.total);
      }, 0),
    romance: aux
      .filter((element) => element.genres === "Romance")
      .reduce((acc, current) => {
        return Number(acc) + Number(current.total);
      }, 0),
      science_fiction: aux
      .filter((element) => element.genres === "Ciencia Ficción")
      .reduce((acc, current) => {
        return Number(acc) + Number(current.total);
      }, 0),
      fantasy: aux
      .filter((element) => element.genres === "Fantasía")
      .reduce((acc, current) => {
        return Number(acc) + Number(current.total);
      }, 0),
      horror: aux
      .filter((element) => element.genres === "Terror")
      .reduce((acc, current) => {
        return Number(acc) + Number(current.total);
      }, 0),
      adventure: aux
      .filter((element) => element.genres === "Aventura")
      .reduce((acc, current) => {
        return Number(acc) + Number(current.total);
      }, 0),
      crime: aux
      .filter((element) => element.genres === "Policial")
      .reduce((acc, current) => {
        return Number(acc) + Number(current.total);
      }, 0),
      suspense: aux
      .filter((element) => element.genres === "Suspenso")
      .reduce((acc, current) => {
        return Number(acc) + Number(current.total);
      }, 0),
      drama: aux
      .filter((element) => element.genres === "Drama")
      .reduce((acc, current) => {
        return Number(acc) + Number(current.total);
      }, 0),
      poetry: aux
      .filter((element) => element.genres === "Poesía")
      .reduce((acc, current) => {
        return Number(acc) + Number(current.total);
      }, 0),
  };
  return revenue;
};

module.exports = {
  getOrderAmount,
  amountByGenre,
};
