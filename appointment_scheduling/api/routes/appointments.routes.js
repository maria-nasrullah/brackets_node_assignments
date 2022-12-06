//importing packages
const express = require("express");
const { SYSTEM_ROLES_ENUM } = require("../../config/constants");

//importing controller and middlewares
const AppointmentController = require("../controllers/appointments.controller");
const Auth = require("../middlewares/Auth");
const AuthorizeTo = require("../middlewares/Authorization");
const AuthUser = require("../middlewares/AuthUser");
const { validateData } = require("../middlewares/validation");
const appointmentSchema = require("../validations/appointments.validation-schema");

const router = express.Router();

//scheduling appointment
router.post(
  "/schedule",
  Auth,
  AuthUser,
  AuthorizeTo(SYSTEM_ROLES_ENUM.ASSISTANT),
  validateData(appointmentSchema, "body"),
  AppointmentController.appointmentSchedule
);

//updating status of appointment
router.patch(
  "/:appointmentId",
  Auth,
  AuthUser,
  AuthorizeTo(SYSTEM_ROLES_ENUM.ASSISTANT, SYSTEM_ROLES_ENUM.MD),
  AppointmentController.appointmentUpdate
);

module.exports = router;
