const { Router } = require("express");
const userRouter = Router();
const { postUserHandler } = require("../handlers/usersHandlers");

userRouter.post("/", postUserHandler);

module.exports = userRouter;
