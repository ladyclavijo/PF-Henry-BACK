const { Router } = require("express");
const cartRouter = Router();
const {
  postCartHandler,
  getAllCartsHandler,
  updateCartHandler,
  deleteCartHandler,
} = require("../handlers/cartsHandlers");

cartRouter.get("/", getAllCartsHandler);
cartRouter.post("/", postCartHandler);
cartRouter.put("/", updateCartHandler);
cartRouter.delete("/", deleteCartHandler);

module.exports = cartRouter;
