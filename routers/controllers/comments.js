const commentModel = require("../../db/models/comments");

const createNewComment = (req, res) => {

    const { comments, commenter } = req.body;

    const newCom = new commentModel({
        comments,
        commenter,
    });
    newCom
        .save()
        .then((com) => {
            res.status(201);
            res.json(com);
        })
        .catch((err) => {
            const errorAdded = {
                success: false,
                message: "something went wrong while creating a new comment"
            }
            res.status(500);
            res.json(errorAdded);
        });

};


module.exports = createNewComment;