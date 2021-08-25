const mongoose = require("mongoose");

const articles = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

//comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }]
module.exports = mongoose.model("articles", articles);