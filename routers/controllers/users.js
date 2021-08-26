const users = require("../../db/models/users");
const bcrypt = require('bcrypt');

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
    const { email, password } = req.body;
    users.findOne({ email }).then((result) => {
        if (!result) {
            res.status(404).json("email not found");
        }
        try {
            const vaild = bcrypt.compare(password, result.password);
            console.log(vaild);
            if (!vaild) {
                res.status(404).json("password error");
            } else {
                const payload = {
                    userId: result._id,
                    country: result.name,
                };

                const SECRET = process.env.SECRET;
                const options = {
                    expiresIn: "60m",
                };

                const token = jwt.sign(payload, SECRET, options);

                res.status(200).json({ message: " you logged in", token: token });
            }
        } catch (error) {
            res.json(error);
        }
    });
}
module.exports = { createNewAuthor, login };