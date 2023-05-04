//importing dependencing

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { productRouter } = require("./routes/product.route");
const { orderRouter } = require("./routes/order.route");
// const { authentication } = require("./middlewares/auth.middleware");
const PORT = process.env.PORT;
//starting the express app
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send({ msg: "home route" });
});

//main routes
app.use("/users", userRouter);

//authentication
// app.use(authentication);

app.use("/products", productRouter);
app.use("/orders", orderRouter);

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
