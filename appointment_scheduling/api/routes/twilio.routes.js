//adding dependencies
const express = require("express");

//importing controller
const { smsSend } = require("../controllers/twilio.controller");

//initializing route
const route = express.Router();

route.post("/sendSMS", smsSend);

module.exports=route