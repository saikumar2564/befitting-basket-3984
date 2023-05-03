const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { authentication } = require("../middlewares/auth.middleware");
// const redisClient = require("../helpers/redis");

//signup route
userRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, email, gender, password, phoneNo } = req.body;
  try {
    const isUserPresent = await userModel.findOne({ email });
    if (isUserPresent) {
      return res
        .status(400)
        .send({ msg: "User already Present, login please" });
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
    res.status(400).send({ msg: "new user is added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//login route
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserPresent = await userModel.findOne({ email });
    console.log(isUserPresent);
    if (!isUserPresent) {
      return res
        .status(400)
        .send({ msg: "email not registered, create an account" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserPresent.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).send({ msg: "wrong password" });
    }

    const token = await jwt.sign(
      { userID: isUserPresent._id, data: "shoes" },
      process.env.JWT_secret,
      { expiresIn: 1000 }
    );

    res.status(200).send({ msg: "login successful ", token: token });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

//logout
// userRouter.get("/logout", async (req, res) => {
//   try {
//     const logoutToken = req.headers.authorization;

//     if (!logoutToken) {
//       return res.status(400).send({ msg: "invalid token" });
//     }
//     // await redisClient.set(logoutToken, logoutToken);
//     redisClient.set("token", logoutToken, (error, result) => {
//       if (result) {
//         console.log("Data stored in Redis:", result);
//       }
//     });
//     res.status(200).send({ msg: "logout successful " });
//   } catch (error) {
//     res.status(400).send({ msg: error.message });
//   }
// });
module.exports = { userRouter };
