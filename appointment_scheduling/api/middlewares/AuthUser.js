//imporing user services
const { getUserById } = require("../services/users.services");

//getting user by token
module.exports = async (req, res, next) => {
  try {
    const { tokenId } = req;
    const { userId } = req.params;
    const userExist = await getUserById(tokenId);
    if (!userExist || userExist._id.toString() !== userId) {
      return res.status(400).json({
        msg: "You are unauthorized",
      });
    }
    await next();
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};
