const { Router } = require("express");
const userRouter = Router();
const {
  postUserHandler,
  getAllUsersHandler,
  updateUserHandler,
  getUserByIdHandler,
  postReviewHandler,
  deletReviewHandler
} = require("../handlers/usersHandlers");

userRouter.get("/", getAllUsersHandler);
userRouter.get("/:id", getUserByIdHandler);
userRouter.post("/register", postUserHandler);
userRouter.put("/update", updateUserHandler);
userRouter.post("/review", postReviewHandler);
userRouter.delete("/review/delete/:id", deletReviewHandler)

module.exports = userRouter;
