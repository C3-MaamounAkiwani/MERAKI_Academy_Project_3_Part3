const express = require("express");
const bcrypt = require("bcrypt");
const users = require("./db/models/users");
const article = require("./db/models/articles");
const commit = require("./db/models/comments");
const db = require("./db/db");
const userRouter = require('./routers/routes/users');
const articleRouter = require('./routers/routes/articles');
const commentsRouter = require('./routers/routes/comments')
const { application } = require("express");

const app = express();
app.use(express.json());


app.use('/', userRouter);
app.use('/', articleRouter);
app.use('/login', userRouter);
app.use("*", (req, res) => res.status(404).json("NO content at this path"));
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});