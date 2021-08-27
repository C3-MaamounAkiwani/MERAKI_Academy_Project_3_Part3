const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const user = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    country: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});


user.pre("save", async function() {
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("Users", user);