//adding dependencies
const express = require("express");

//importing middlewares
const AuthMiddleware = require("../middlewares/Auth");
const AuthUserMiddleware = require("../middlewares/AuthUser");
const upload = require("../middlewares/multer");

//importing controller
const userController = require("../controllers/users.controller");
const AuthorizeTo = require("../middlewares/Authorization");
const { SYSTEM_ROLES_ENUM } = require("../../config/constants");

//initializing route
const router = express.Router();

router.post("/registeration", userController.register);

router.post("/login", userController.login);

router.patch(
  "/:userId/update",
  AuthMiddleware,
  AuthUserMiddleware,
  userController.update
);

router.patch(
  "/:userId/upload",
  AuthMiddleware,
  AuthUserMiddleware,
  upload.single("avatar"),
  userController.uploadProfileImage
);

router.post(
  "/logout",
  AuthMiddleware,
  AuthUserMiddleware,
  userController.logout
);

router.post("/verify_OTP/:userId", userController.OTPVerification);

//FOR ADMIN
router.post(
  "/create",
  AuthMiddleware,
  AuthUserMiddleware,
  AuthorizeTo(SYSTEM_ROLES_ENUM.SYS_ADMIN),
  userController.register
);

router.patch(
  "/:userId",
  AuthMiddleware,
  AuthUserMiddleware,
  AuthorizeTo(SYSTEM_ROLES_ENUM.SYS_ADMIN),
  userController.updateUser
);

router.delete(
  "/:userId",
  AuthMiddleware,
  AuthUserMiddleware,
  AuthorizeTo(SYSTEM_ROLES_ENUM.SYS_ADMIN),
  userController.deleteUser
);

module.exports = router;
