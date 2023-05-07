const jwt = require("jsonwebtoken");
const { blacklistModel } = require("../models/blacklist.model");
const { redisClient } = require("../helpers/redis");
require("dotenv").config();
const authentication = async (req, res, next) => {
  // console.log(req);
  // console.log(req.cookies);
  // res.send("hi");
  // return;
  // console.log(req.body.cookie);
  // return;
  const stepupAccessToken = req.headers.authorization;
  // const { stepupAccessToken, stepupRefreshToken } = req.cookies;
  if (!stepupAccessToken) {
    return res.status(400).send({ msg: "invalid token" });
  }
  const isTokenPresent = await blacklistModel.findOne({
    token: stepupAccessToken,
  });
  if (isTokenPresent) {
    return res.status(400).send({ msg: "login again" });
  }
  const tokenData = await jwt.verify(stepupAccessToken, process.env.JWT_secret);

  if (!tokenData) {
    return res.status(400).send({ msg: "authentication failed" });
  }

  const isTokenBlacklist = await redisClient.get(stepupAccessToken);

  if (isTokenBlacklist) {
    return res.status(400).send({ msg: "token blacklisted" });
  }

  console.log(req.body);
  req.body.userID = tokenData.userID;


  next();
};
module.exports = { authentication };
