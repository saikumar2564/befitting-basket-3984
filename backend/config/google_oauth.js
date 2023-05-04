const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { userModel } = require("../models/user.model");

const request = require("request");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function inferGender(firstName, callback) {
  const url = `https://gender-api.com/get?name=${firstName}&key=${process.env.GENDER_API_KEY}`;

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      if (data.gender) {
        console.log("data gender", data.gender);
        callback(data.gender);
      } else {
        callback(null);
      }
    } else {
      callback(null);
    }
  });
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      const name = profile.displayName;
      const email = profile.emails[0].value;
      const firstName = name.split(" ")[0];

      inferGender(firstName, async function (gender) {
        // Use the gender for further processing
        console.log(gender);
        let email = profile._json.email;
        let name = profile._json.name;
        const isUserPresent = await userModel.findOne({ email });
        if (isUserPresent) {
          const token = await jwt.sign(
            { userID: isUserPresent._id, data: "shoes" },
            process.env.JWT_secret,
            { expiresIn: "7d" }
          );
          console.log(token);
          return cb(null, token);
        }
        const hashedPassword = await bcrypt.hash(uuidv4(), 8);
        const newUserOauth = new userModel({
          email,
          name,
          gender,
          password: hashedPassword,
        });
        newUserOauth.save();
        return cb(null, newUserOauth);
        // console.log(profile);
        // cb(null, profile);
      });

      console.log(profile);
    }
  )
);

module.exports = { passport };
