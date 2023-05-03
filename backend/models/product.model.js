const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    size: { type: Number, required: true },
    gender: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    versionkey: false,
  }
);

const productModel = mongoose.model("product", productSchema);
module.exports = { productModel };
