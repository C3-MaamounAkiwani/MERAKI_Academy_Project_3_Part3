const express = require("express");
const users = require("./db/models/users");
const article = require("./db/models/articles");
const role = require("./db/models/roles");
const db = require("./db/db");
const userRouter = require('./routers/routes/users');
const articleRouter = require('./routers/routes/articles');
const roleRouter = require('./routers/routes/roles');
const bcrypt = require("bcrypt");
const app = express();
require("dotenv").config();
app.use(express.json());


app.use('/', userRouter);
app.use('/', articleRouter);
app.use('/login', userRouter);
app.use('/', roleRouter);
app.use("*", (req, res) => res.status(404).json("NO content at this path"));
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});