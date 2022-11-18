const mongoose = require("mongoose");
const { dbURI } = require("./credentials");

const connectDB = () => {
  mongoose
    .connect(dbURI)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));
};

module.exports = { connectDB };
