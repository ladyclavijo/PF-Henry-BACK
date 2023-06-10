const { Router } = require("express");
const userRouter = Router();
const {
  postUserHandler,
  getAllUsersHandler,
  getUserByIdHandler
} = require("../handlers/usersHandlers");

userRouter.get("/", getAllUsersHandler);
userRouter.get("/:id", getUserByIdHandler)
userRouter.post("/register", postUserHandler);

module.exports = userRouter;
