const express = require("express");
const {
    createNewRole
} = require('../controllers/roles');

const roleRouter = express.Router();

roleRouter.post("/role", createNewRole);

module.exports = roleRouter;