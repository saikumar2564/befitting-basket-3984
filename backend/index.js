const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { productRouter } = require("./routes/product.route");
const { authentication } = require("./middlewares/auth.middleware");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use(authentication);

app.use("/products", productRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log("can't connect to db");
  }

  console.log("server is running at " + process.env.port);
});
