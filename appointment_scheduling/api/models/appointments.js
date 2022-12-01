const mongoose = require("mongoose");

const { APPOINTMENT_STATUS_ENUM } = require("../../config/constants");

const appointmentSchemaa = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "Patient",
    },
    startTime: { type: Date },
    endTime: { type: Date },
    status: {
      type: String,
      enum: APPOINTMENT_STATUS_ENUM,
    },
  },
  {
    timestamps: true,
    strict: true,
    collection: "appointments",
  }
);

module.exports = mongoose.model("Appointment", appointmentSchemaa);
