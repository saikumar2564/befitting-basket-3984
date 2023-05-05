const express = require("express");
const cookieparser = require("cookie-parser");
const userRouter = express.Router();
const { userModel } = require("../models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { authentication } = require("../middlewares/auth.middleware");
const redisClient = require("../helpers/redis");

userRouter.use(cookieparser());
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
    console.log(isUserPresent);
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserPresent.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).send({ msg: "wrong password" });
    }

    const accessToken = jwt.sign(
      { userID: isUserPresent._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "4d",
      }
    );
    const refreshToken = jwt.sign(
      { userID: isUserPresent._id },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "20d",
      }
    );

    //storing these tokens in  the cookie

    res.cookie("stepupAccessToken", accessToken, {
      maxAge: 1000 * 3600 * 24 * 4,
    });
    res.cookie("stepupRefreshToken", refreshToken, {
      maxAge: 1000 * 3600 * 24 * 20,
    });
    res.status(200).send({ msg: "login successful ", token: accessToken });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error });
  }
});

//get new token from refresh token
userRouter.get("/getnewtoken", (req, res) => {
  const stepupRefreshToken =
    req.cookies.stepupRefreshToken || req?.headers?.authorization;
  try {
    const decoded = jwt.verify(refreshtoken, process.env.REFRESH_SECRET);
    if (decoded) {
      const token = jwt.sign(
        { userId: decoded.userId },
        process.env.JWT_SECRET,
        {
          expiresIn: "4d",
        }
      );
      return res.send({ token: token });
    } else {
      res.send("invalid refresh token, plz login again");
    }
  } catch (error) {
    res.status(400).send({ msg: error.msg });
  }
});
//logout
userRouter.get("/logout", async (req, res) => {
  try {
    const { stepupAccessToken, stepupRefreshToken } = req.cookies;

    console.log("stepupAccessToken", stepupAccessToken);
    console.log("stepupRefreshToken", stepupRefreshToken);

    if (!stepupAccessToken) {
      return res.status(400).send({ msg: "invalid token" });
    }

    //saving the blacklisted access token in redis
    redisClient.set("blacklistedToken", stepupAccessToken, (error, result) => {
      if (result) {
        console.log("Data stored in Redis:", result);
      }
    });

    //saving the blacklisted refresh token in redis
    redisClient.set("blacklistedToken", stepupRefreshToken, (error, result) => {
      if (result) {
        console.log("Data stored in Redis:", result);
      }
    });
    res.status(200).send({ msg: "logout successful " });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error.message });
  }
});
module.exports = { userRouter };
