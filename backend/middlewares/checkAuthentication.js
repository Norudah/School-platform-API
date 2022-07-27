const { checkToken } = require("../lib/jwt");
const { User } = require("../models/postgres");

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.sendStatus(401);
  }
  const [type, token] = header.split(/\s+/);
  if (type !== "Bearer") {
    return res.sendStatus(401);
  }
  const user = await checkToken(token);

  if (user) {
    const userFromDB = await User.findByPk(user.id);
    req.user = userFromDB;
    next();
  } else {
    res.sendStatus(401);
  }
};
