const users = require("../../db/models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const createNewAuthor = (req, res) => {
    const { firstName, lastName, age, country, email, password, role } = req.body;

    const newUser = new users({
        firstName,
        lastName,
        age,
        country,
        email,
        password,
        role,
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
    users.findOne({ email: email }).populate("role", "-_id").then(async(result) => {
        if (!result) {
            res.status(404);
            res.json({
                sussess: false,
                message: `The email doesn't exist`
            });
        }
        const validPassword = await bcrypt.compare(password, result.password);
        if (validPassword) {
            const payload = {
                userId: result._id,
                country: result.country,
                role: {
                    role: result.role,
                    permissions: result.permissions,
                }
            };
            const SECRET = process.env.SECRET;
            const options = {
                expiresIn: "60m",
            };
            const token = jwt.sign(payload, SECRET, options);
            res.status(200).json({
                sussess: true,
                message: "Email and Password are correct",
                token: token
            });
        } else {
            res.status(403);
            res.json({
                sussess: false,
                message: `The password you’ve entered is incorrect`
            });
        }
    });
}
module.exports = { createNewAuthor, login };