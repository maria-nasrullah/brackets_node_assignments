//adding dependencies
const express = require("express");

//importing middlewares
const AuthMiddleware = require("../middlewares/Auth");
const AuthUserMiddleware = require("../middlewares/AuthUser");
const upload = require("../middlewares/multer");

//importing controller
const userController = require("../controllers/users.controller");

//initializing route
const route = express.Router();

route.post("/registeration", userController.register);

route.post("/login", userController.login);

route.patch(
  "/:userId/update",
  AuthMiddleware,
  AuthUserMiddleware,
  userController.update
);

route.patch(
  "/:userId/upload",
  upload.single("avatar"),
  userController.uploadProfileImage
);

module.exports = route;
