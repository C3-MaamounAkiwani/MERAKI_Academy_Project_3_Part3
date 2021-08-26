const roles = require("../../db/models/roles");

const createNewRole = (req, res) => {
    const { role, permissions } = req.body;
    const newroles = new roles({
        role,
        permissions,
    });
    newroles
        .save()
        .then((roles) => {
            res.status(201);
            res.json({
                sussess: true,
                message: `Success Role Added`,
                role: roles
            })
        })
        .catch((err) => {
            res.status(500);
            res.json({
                sussess: false,
                message: `Server error`,
            })
        });
};

module.exports = { createNewRole };