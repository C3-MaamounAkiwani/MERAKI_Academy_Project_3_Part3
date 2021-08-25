const bcrypt = require('bcrypt');
const users = require("../../db/models/users");


const createNewAuthor = (req, res) => {
    const { firstName, lastName, age, country, email, password } = req.body;

    const newUser = new users({
        firstName,
        lastName,
        age,
        country,
        email,
        password,
    });

    newUser
        .save()
        .then((author) => {
            const sussessAdded = {
                success: true,
                message: "Success Author Added",
                author
            }
            res.status(200);
            res.json(sussessAdded);
        })
        .catch((err) => {
            const errorAdded = {
                success: false,
                message: "The email already exists",
            }
            res.status(409);
            res.json(errorAdded);
        });
};

const login = function(req, res) {
    useremail = req.body.email;
    userpassword = req.body.password;
    users.findOne({ email: useremail, password: userpassword })
        .then((result) => {
            if (result) {
                const valid = {
                    success: true,
                    message: `valid login credentials`
                }
                res.status(200);
                res.json(valid);
            } else {
                const Invalid = {
                    success: false,
                    message: `Invalid login credentials`
                }
                res.status(404);
                res.json(Invalid);
            }
        })
        .catch((error) => {
            throw error;
        })
}
module.exports = { createNewAuthor, login };