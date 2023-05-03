const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  image1: String,
  image2: String,
  gender: String,
  size: Number,
  price: Number,
  brand: String,
  id: String,
  quantity: Number,
});

const orderSchema = new mongoose.Schema({
  firstName: String,
  products: [productSchema],
  lastName: String,
  Address: String,
  phoneNo: String,
  orderValue: Number,
  id: String,
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = { orderModel };
