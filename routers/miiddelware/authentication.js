const jwt = require("jsonwebtoken");
const authentication = (req, res, next) => {
    const token = req.headers.authorization.split(" ").pop();
    jwt.verify(token, process.env.SECRET, (err, result) => {
        if (err) {
            const expcomment = {
                sussess: false,
                message: `The Token is invalid or expired`
            }
            res.json(expcomment);
        } else {
            res.json({
                sussess: true,
                message: `The new comment added`,
                comment: result
            })
            next();
        }
    });
};
module.exports = { authentication };