require("dotenv").config();
const { Router } = require("express");
const paymentRoute = Router();
const stripe = require("stripe")(process.env.PAYMENT_KEY);
const { getOrderAmount } = require("../data/data");
const { order } = require("../db");

paymentRoute.post("/", async (req, res) => {
  const item = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await getOrderAmount(item),
    currency: "usd", // "currecsy" corregido a "currency"
  });
  try {
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: error,
    });
  }
});

paymentRoute.post("/order", async (req, res) => {
  const { items, userId } = req.body;
  const itemsWithTotal = await getOrderAmount(items)
  await items.push({total : itemsWithTotal})
  try {
    await order.create({ items, userId });
    res.status(200).send('new order created');
  } catch (error) {
    res.status(400).json({  error: error.message });
  }
});

module.exports = paymentRoute;
