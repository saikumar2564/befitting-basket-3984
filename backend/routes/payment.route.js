const express = require("express");
const crypto = require('crypto');
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

paymentRouter.post('/verifyOrder', (req, res) => {

  //  Receive Payment Data
  const { order_id, payment_id } = req.body;
  const razorpay_signature = req.headers['x-razorpay-signature'];

  // Pass yours key_secret here
  const key_secret = process.env.RAZORPAY_API_KEY_SECRET

  //Verification & Send Response to user, Creating hmac object
  let hmac = crypto.createHmac('sha256', key_secret);

  // Passing the data to be hashed
  hmac.update(order_id + "|" + payment_id);

  // Creating the hmac in the required format
  const generated_signature = hmac.digest('hex');

  if (razorpay_signature === generated_signature) {
    res.json({ success: true, message: "Payment has been verified" })
  }
  else
    res.json({ success: false, message: "Payment verification failed" })
});

module.exports = { paymentRouter };
