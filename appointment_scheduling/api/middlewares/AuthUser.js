//imporing user services
const { getUserById } = require("../services/users.services");

//getting user by token
module.exports = async (req, res, next) => {
  try {
    const { token } = req;
    const tokenId = token._id;
    const userExist = await getUserById(tokenId);

    req.user = userExist;
    if (!userExist?.uniqueKeys.includes(token.uniqueKey)) {
      return res.status(400).json({ msg: "session ended" });
    }

    next();
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};
