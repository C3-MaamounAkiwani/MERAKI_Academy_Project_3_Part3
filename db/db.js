const mongoose = require("mongoose");

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};

const DB_URL = "mongodb://localhost:27017/project_3_v01";
mongoose.connect(DB_URL, options).then(
    () => {
        console.log("sussess connected with db");
    },
    (errr) => {
        console.log(errr);
    }
);

module.exports = mongoose;