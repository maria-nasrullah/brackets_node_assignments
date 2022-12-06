const joi = require("joi");

const appointmentSchema = joi.object({
  userId: joi
    .string()
    .error(new Error("Expecting string"))
    .length(24)
    .alphanum()
    .required(),
  patientId: joi.string().length(24).alphanum().required(),
  startTime: joi.date().required(),
  endTime: joi.date(),
  status: joi.string().required(),
});

module.exports = appointmentSchema;
