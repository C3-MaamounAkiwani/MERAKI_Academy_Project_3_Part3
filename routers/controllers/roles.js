const roles = require("../../db/models/roles");

const createNewRole = (req, res) => {
    let { role, permissions } = req.body;
    const newroles = new roles({
        role,
        permissions,
    });
    newroles
        .save()
        .then((roles) => {
            /// consle.log(req.body.role);
            if (roles) {
                res.status(201);
                res.json({
                    sussess: true,
                    message: `Success Role Added`,
                    role: roles
                })
            } else {
                res.status(402);
                res.json({
                    sussess: false,
                    message: `Server error`,
                })
            }
        })
        .catch((err) => {
            res.json(err);
        });
};

module.exports = { createNewRole };