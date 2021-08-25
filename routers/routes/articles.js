const express = require("express");
const createNewComment = require("../controllers/comments");
const articles = require("../../db/models/articles");
const {
    createNewArticle,
    getAllArticles,
    getArticlesByAuthor,
    getAnArticleById,
    updateAnArticleById,
    deleteArticleById,
    deleteArticlesByAuthor,
} = require('../controllers/articles');

const articlesRouter = express.Router();

articlesRouter.post("/articles", createNewArticle);
articlesRouter.get("/articles", getAllArticles);
articlesRouter.get("/articles/search_1", getArticlesByAuthor);
articlesRouter.get("/articles/search_2", getAnArticleById);
articlesRouter.put("/articles/:id", updateAnArticleById)
articlesRouter.delete("/articles/:id", deleteArticleById);
articlesRouter.delete("/articles", deleteArticlesByAuthor);
///articlesRouter.post("/articles/:id/comments", createNewComment)



module.exports = articlesRouter;