//adding dependencies
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
    },
    userName: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    number: {
      type: Number,
    },
    address: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
