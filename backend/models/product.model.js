const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    image1: { type: String, required: true },
    image2: { type: String, required: true },
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

// {
//   "image1": "kkk",
//   "image2": "kioo",
//   "name": "Harman",
//   "brand": "Keltic",
//   "size": 12,
//   "gender": "male",
//   "price": 4500,
// }
