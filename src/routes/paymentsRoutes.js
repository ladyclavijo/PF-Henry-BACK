require("dotenv").config();
const { Router } = require("express");
const paymentRoute = Router();
const stripe = require("stripe")(process.env.PAYMENT_KEY);
const { getOrderAmount } = require("../data/data");
const { order } = require("../db");
const {
  getOrderHandler,
  getAllOrdersHandler,
} = require ('../handlers/paymentHandler')

paymentRoute.post("/", async (req, res) => {
  const { items, receipt_email, payment_method } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await getOrderAmount(items),
    currency: "usd",
    payment_method: payment_method,
    receipt_email: receipt_email,
    confirm: true,
    description:
      "Congratulations on your purchase at BookBuster! We hope you enjoy your new book and have a fantastic reading experience!",
  });
  try {
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
});

paymentRoute.post("/order", async (req, res) => {
  const { items, userId } = req.body;
  const itemsWithTotal = await getOrderAmount(items)
  await items.push({ total: itemsWithTotal });
  try {
    await order.create({ items, userId });
    res.status(200).send("new order created");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

paymentRoute.get("/orders", getAllOrdersHandler)
paymentRoute.get("/sales", getOrderHandler)

module.exports = paymentRoute;
