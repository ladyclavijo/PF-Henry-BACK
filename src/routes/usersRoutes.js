const { Router } = require("express");
const userRouter = Router();
const {
  postUserHandler,
  getAllUsersHandler,
  updateUserHandler,
} = require("../handlers/usersHandlers");

userRouter.get("/", getAllUsersHandler);
userRouter.post("/register", postUserHandler);
userRouter.put("/update", updateUserHandler);

module.exports = userRouter;
