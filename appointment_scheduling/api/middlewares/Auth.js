//adding dependencies
const JWT = require("jsonwebtoken");

//importing seceret key
const { secretKey } = require("../../config/credentials");

//Authenticatation
module.exports = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token.split(" ")[0] != "Bearer") {
      return res.status(401).json({
        msg: "Access denied ",
      });
    }
    token = token.split(" ")[1];

    //getting decoded token
    const decoded = JWT.verify(token, secretKey);
    if (!decoded._id) {
      return res.status(400).json({
        message: "You're unauthorized to do this action",
      });
    }
    req.tokenId = decoded._id;
    await next();
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};
