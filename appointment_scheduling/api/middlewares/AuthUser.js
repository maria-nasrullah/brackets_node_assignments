//imporing user services
const { getUserById } = require("../services/users.services");

//getting user by token
module.exports = async (req, res, next) => {
  try {
    const { token } = req;
    const tokenId=token._id;
    const userExist = await getUserById(tokenId);
    if(req.params.userId){

      const { userId } = req.params;
      if (!userExist || userExist._id.toString() !== userId) {
        return res.status(400).json({
          msg: "You are unauthorized",
        });
      }
    }
     req.user=userExist;
     if(!userExist?.uniqueKeys.includes(token.uniqueKey)){
      return res.status(400).json({msg:"session ended"})
     }
    await next();
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};
