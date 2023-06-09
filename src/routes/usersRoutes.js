const { Router } = require("express");
const userRouter = Router();
const {
  postUserHandler,
  getAllUsersHandler,
} = require("../handlers/usersHandlers");

userRouter.get("/", getAllUsersHandler);
userRouter.post("/register", postUserHandler);

module.exports = userRouter;
