//importing packages
const express = require("express");

//importing controller and middlewares
const AnalyticsController = require("../controllers/analytics.controllers");
const Auth = require("../middlewares/Auth");
const AuthorizeTo = require("../middlewares/Authorization");
const AuthUser = require("../middlewares/AuthUser");
const { SYSTEM_ROLES_ENUM } = require("../../config/constants");

const router = express.Router();

//scheduling appointment
router.get(
  "/per-day/:userId",
  Auth,
  AuthUser,
  AuthorizeTo(SYSTEM_ROLES_ENUM.MD, SYSTEM_ROLES_ENUM.SYS_ADMIN),
  AnalyticsController.perDayApponitments
);

//scheduling appointment
router.get(
  "/day/:userId",
  Auth,
  AuthUser,
  AuthorizeTo(SYSTEM_ROLES_ENUM.MD, SYSTEM_ROLES_ENUM.SYS_ADMIN),
  AnalyticsController.eveningMornong
);

module.exports = router;
