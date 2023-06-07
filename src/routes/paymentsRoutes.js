require("dotenv").config();
const { Router } = require("express");
const paymentRoute = Router();
const stripe = require("stripe")(process.env.PAYMENT_KEY);
const {getOrderAmount} = require('../data/data')




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
    res.status(400).json({
      error: error
    });
  }
});

module.exports = paymentRoute;
