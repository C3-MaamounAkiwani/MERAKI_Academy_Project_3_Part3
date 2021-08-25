/**
 * const comment = require("../../db/models/comments");

const createNewComment = (req, res) => {

    const { comment, commenter } = req.body;

    const newCom = new comment({
        comment,
        commenter,
    });
    newCom
        .save()
        .then((com) => {
            const sussessAdded = {
                success: true,
                message: "the new comment added"
            }
            res.status(201);
            res.json(sussessAdded);
        })
        .catch((err) => {
            const errorAdded = {
                success: false,
                message: "server error"
            }
            res.status(500);
            res.json(errorAdded);
        });

};


module.exports = { createNewComment };
 */