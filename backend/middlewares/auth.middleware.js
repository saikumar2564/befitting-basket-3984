const jwt = require("jsonwebtoken");

const { redisClient } = require("./redis.middleware");
require("dotenv").config();
const authectication = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).send({ msg: "invalid token" });
    return;
  }

  const tokenData = await jwt.verify(token, process.env.JWT_secret);

  if (!tokenData) {
    res.status(400).send({ msg: "authentication failed" });
    return;
  }

  const isTokenBlacklist = await redisClient.get(token);

  if (isTokenBlacklist) {
    res.status(400).send({ msg: "token blacklisted" });
    return;
  }

  req.body.userID = tokenData.userID;
  console.log(req.body);
  next();
};
module.exports = { authectication };
