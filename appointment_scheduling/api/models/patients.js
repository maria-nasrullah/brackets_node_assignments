const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
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
    phoneNumber: {
      type: String,
    },
    CNIC: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
    },
    disease: {
      type: [String],
    },
    diseaseDetail: {
      type: String,
    },
    stripeCustomerId: {
      type: String,
    },
    stripeCardId: {
      type: String,
    },
    stripeTokenId: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "patients",
  }
);

module.exports = mongoose.model("Patient", patientSchema);
