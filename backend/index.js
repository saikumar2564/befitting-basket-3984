//importing dependencing

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { productRouter } = require("./routes/product.route");
const { orderRouter } = require("./routes/order.route");
const { paymentRouter } = require("./routes/payment.route");
const { passport } = require("./config/google_oauth");
const { authentication } = require("./middlewares/auth.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const cookieparser = require("cookie-parser");

const PORT = process.env.PORT;
//starting the express app
const app = express();
app.use(cookieparser());
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send({ msg: "home route" });
});

//google oauth route
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      // "https://www.googleapis.com/auth/user.phonenumbers.read",
    ],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    // console.log(req);
    res.redirect("/");
    res.cooki;
  }
);
//*****fb oauth*** *
// var FacebookStrategy = require('passport-facebook').Strategy;

// passport.use(new FacebookStrategy({
//     clientID: process.env.facebookid,
//     clientSecret: process.env.facebooksecret,
//     callbackURL: "http://localhost:4500/auth/facebook/callback",
//     scope: ['email'] // add the scope parameter here
// },
//     function (accessToken, refreshToken, profile, cb) {
//         // access the user's email address
//         // var email = profile.emails[0].value;
//         // console.log(email);
//         console.log(profile)
       
        
//         // return the user's profile to the callback function
//         return cb(null, profile);
//     }
// ));


app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' ,session:false}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
//main routes
app.use("/users", userRouter);

//authentication

app.use("/products", productRouter);
// app.use(authentication);
app.use("/orders", orderRouter);
app.use("/payments", paymentRouter);

//listening to server
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log("can't connect to db");
  }
  console.log("server is running at " + PORT);
});
