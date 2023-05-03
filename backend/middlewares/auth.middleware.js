const jwt = require("jsonwebtoken");

const { redisClient } = require("../helpers/redis");
require("dotenv").config();
const authectication = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).send({ msg: "invalid token" });
  }

  const tokenData = await jwt.verify(token, process.env.JWT_secret);

  if (!tokenData) {
    return res.status(400).send({ msg: "authentication failed" });
  }

  const isTokenBlacklist = await redisClient.get(token);

  if (isTokenBlacklist) {
    return res.status(400).send({ msg: "token blacklisted" });
  }

  req.body.userID = tokenData.userID;

  console.log(req.body);

  next();
};
module.exports = { authectication };
