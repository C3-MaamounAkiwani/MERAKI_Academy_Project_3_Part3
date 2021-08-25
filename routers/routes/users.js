const express = require("express");
const {
    createNewAuthor,
    login
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.post("/users", createNewAuthor);
userRouter.post("/login", login);

module.exports = userRouter;