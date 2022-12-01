//adding dependencies
const mongoose = require("mongoose");
const { SYSTEM_ROLES_ENUM } = require("../../config/constants");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
    },
    uniqueKeys: {
      type: [String],
    },
    OTP: {
      type: String,
    },
    systemRole: {
      type: String,
      enum: SYSTEM_ROLES_ENUM,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
