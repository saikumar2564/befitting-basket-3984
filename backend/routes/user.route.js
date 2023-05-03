const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
const { authentication } = require("../middlewares/auth.middleware");
const redisClient = require("../helpers/redis");

//signup route
userRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, email, gender, password, phoneNo } = req.body;
  try {
    const isUserPresent = await user.findOne({ email });
    if (isUserPresent) {
      return res.status(400).send("User already Present, login please");
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new userModel({
      name,
      email,
      gender,
      password: hashedPassword,
      phoneNo,
    });
    await newUser.save();
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//login route
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserPresent = await userModel.findOne({ email });

    if (!isUserPresent) {
      return res.status.send({ msg: "User not present, ceate account" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserPresent.password
    );

    if (!isPasswordCorrect) {
      return res.status.send({ msg: "wrong password" });
    }

    const token = await jwt.sign(
      { userID: isUserPresent._id, data: "shoes" },
      process.env.JWT_secret,
      { expiresIn: 1000 }
    );

    res.status(200).send({ msg: "login successful ", token: token });
  } catch (error) {
    res.status(400).send({ msg: "email already registered, please log in" });
  }
});

//logout
userRouter.get("/logout", authentication, async (req, res) => {
  try {
    const logoutToken = req.headers.authorization;

    if (!logoutToken) {
      res.status(400).send({ msg: "invalid token" });
      return;
    }
    await redisClient.set(token, token);
    res.status(200).send({ msg: "logout successful " });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
module.exports = { userRouter };
