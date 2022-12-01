//adding dependencies
const express = require("express");

//importing middlewares
const AuthMiddleware = require("../middlewares/Auth");
const AuthUserMiddleware = require("../middlewares/AuthUser");
const AuthorizeTo = require("../middlewares/Authorization");
const upload = require("../middlewares/multer");

//importing controller
const PatientController = require("../controllers/patients.controllers");
const { SYSTEM_ROLES_ENUM } = require("../../config/constants");

//initializing route
const router = express.Router();

router.post(
  "/create",
  AuthMiddleware,
  AuthUserMiddleware,
  AuthorizeTo(SYSTEM_ROLES_ENUM.ASSISTANT),
  PatientController.createPatient
);

router.patch(
  "/:patientId",
  AuthMiddleware,
  AuthUserMiddleware,
  AuthorizeTo(SYSTEM_ROLES_ENUM.ASSISTANT),
  PatientController.updatePatient
);

router.patch(
  "/upload/:patientId",
  AuthMiddleware,
  AuthUserMiddleware,
  AuthorizeTo(SYSTEM_ROLES_ENUM.ASSISTANT),
  upload.single("avatar"),
  PatientController.uploadProfileImage
);

router.delete(
  "/:patientId",
  AuthMiddleware,
  AuthUserMiddleware,
  AuthorizeTo(SYSTEM_ROLES_ENUM.ASSISTANT),
  PatientController.deletePatient
);

module.exports = router;
