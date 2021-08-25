const articles = require("../../db/models/articles");



const createNewArticle = (req, res) => {
    const { title, description, author } = req.body;

    const newUser = new articles({
        title,
        description,
        author,
    });

    newUser
        .save()
        .then((article) => {
            const sussessAdded = {
                success: true,
                message: "Success Artical created",
                article
            }
            res.status(201);
            res.json(sussessAdded);
        })
        .catch((err) => {
            const errorAdded = {
                success: false,
                message: "server error",
            }
            res.status(500);
            res.json(errorAdded);
        });
};

const getAllArticles = (req, res) => {
    articles.find({})
        .then((articles) => {
            const allArticles = {
                success: true,
                message: 'all the articles',
                articles: articles
            }
            res.status(200);
            res.json(allArticles);
        })
        .catch((err) => {
            const error = {
                success: false,
                message: "server error"
            }
            res.status(500);
            res.json(error);
        });


}


const getArticlesByAuthor = (req, res) => {
    articles.find({ author: req.query.author }).exec()

    .then((result) => {
            const viewAllArticles = {
                sussess: true,
                message: `all the articles for the author ${req.query.author}  =>`,
                articals: result
            }
            res.status(200);
            res.json(viewAllArticles);
        })
        .catch((err) => {
            const notFound = {
                sussess: false,
                message: `The Author ${req.query.author} Not Found`
            }
            res.status(500);
            res.json(notFound);
        })

}

const getAnArticleById = (req, res) => {
    id = req.query.id;
    articles.find({ _id: id }).populate("author", "firstName , -_id").exec()
        .then((result) => {
            const findById = {
                sussess: true,
                message: `The articals  ${id} =>`,
                articals: result
            }
            res.status(200);
            res.json(findById);
        })
        .catch((err) => {
            const notFoundId = {
                sussess: false,
                message: `The articals ${id} Not Found`
            }
            res.status(500);
            res.json(notFoundId);
        })

}

const updateAnArticleById = (req, res) => {

    id = req.params.id;

    /// Find by id and update
    const { title, description } = req.body;
    articles.where({ _id: id }).updateOne({ title, description }).exec().then(
            (result) => {
                const sussessUpdate = {
                    success: true,
                    message: `Success articals updated`,
                }
                res.json(sussessUpdate);
            })
        .catch((err) => {
            res.json(err);
        })
}




const deleteArticleById = (req, res) => {
    idDelete = req.params.id;
    articles.findByIdAndDelete({ _id: idDelete })
        .then((deleteRcord) => {
            const msgDeleted = {
                success: true,
                message: `Success Delete Artical With id => ${idDelete}`
            }
            res.status(200);
            res.json(msgDeleted)
        }).catch((err) => {
            const filedDelete = {
                success: false,
                message: `The Artical ${idDelete} is not found`
            }
            res.status(404);
            res.json(filedDelete);
        })

}

const deleteArticlesByAuthor = (req, res) => {
    authorDelete = req.body.author;
    articles.findOneAndDelete({ author: authorDelete })
        .then((results) => {
            const deleteByAuthorsussess = {
                sussess: true,
                message: `Sussess Delete articles for the author =>`,
                results: results
            }
            res.status(200);
            res.json(deleteByAuthorsussess);
        }).catch((err) => {
            const fildeDeleteByAuthor = {
                sussess: false,
                message: `The Author is not Found`
            }
            res.status(404);
            res.json(fildeDeleteByAuthor);

        })
}

module.exports = { createNewArticle, getAllArticles, getArticlesByAuthor, getAnArticleById, updateAnArticleById, deleteArticleById, deleteArticlesByAuthor };