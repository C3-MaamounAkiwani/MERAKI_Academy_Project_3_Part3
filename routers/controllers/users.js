const users = require("../../db/models/users");
const bcrypt = require('bcrypt');

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
    users.findOne({ email: email }).then(async(result) => {
        if (!result) {
            res.status(404);
            res.json({
                sussess: false,
                message: `The email doesn't exist`
            });
        }
        const validPassword = await bcrypt.compare(password, result.password);
        /// console.log(validPassword);
        if (validPassword) {
            res.json("valid");
        } else {
            res.status(403);
            res.json({
                sussess: false,
                message: `The password you’ve entered is incorrect`
            });
            /*
                 const payload = {
                userId: result._id,
                country: result.country,
            };
            const SECRET = process.env.SECRET;
            const options = {
                expiresIn: "60m",
            };


            const token = jwt.sign(payload, SECRET, options);

            res.status(200).json({
                message: "Email and Password are correct",
                token: token
            }); */
        }
    });
}
module.exports = { createNewAuthor, login };


/*
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
        } */