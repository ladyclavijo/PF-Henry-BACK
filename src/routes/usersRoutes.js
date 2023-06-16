const { Router } = require("express");
const userRouter = Router();
const {
  postUserHandler,
  getAllUsersHandler,
  updateUserHandler,
  getUserByIdHandler,
  postReviewHandler
} = require("../handlers/usersHandlers");

userRouter.get("/", getAllUsersHandler);
userRouter.get("/:id", getUserByIdHandler);
userRouter.post("/register", postUserHandler);
userRouter.put("/update", updateUserHandler);
userRouter.post("/review", postReviewHandler);

module.exports = userRouter;
