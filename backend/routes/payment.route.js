const express = require("express");
const paymentRouter = express.Router();
require("dotenv").config();
const { allcomments } = require("../helpers/aggregation");

const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_KEY_SECRET,
});

// server-side endpoint to initiate payment
paymentRouter.post("/create-payment", async (req, res) => {
  let amount = req.body.amount;
  const options = {
    amount: amount, // amount in paise
    currency: "INR",
    // payment_capture: 1,
    // receipt: "order_rcptid_11",
  };
  try {
    const response = await instance.orders.create(options);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = { paymentRouter };
