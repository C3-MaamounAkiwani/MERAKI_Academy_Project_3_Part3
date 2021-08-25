/***
 * 
 * const express = require("express");
//const comments = require("../../db/models/comments");
const {
    createNewComment
} = require('../controllers/comments');

ComRouter.post("/:id/comments", createNewComment);
module.exports = ComRouter;
 */