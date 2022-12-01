const AuthorizeTo = (...systemRoles) => {
  return async (req, res, next) => {
    try {
      const { user } = req;
      if (!systemRoles.includes(user?.systemRole)) {
        return res.status(401).json({
          message: "You are unauthorize.",
        });
      }
      console.log(user.systemRole);
      next();
    } catch (error) {
      res.status(501).json({ error: "INTERNAL SERVER ERROR" });
    }
  };
};

module.exports = AuthorizeTo;
