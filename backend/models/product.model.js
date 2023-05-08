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
    id: Number,
  },
  {
    versionkey: false,
  }
);
productSchema.index(
  { name: "text", brand: "text" },
  async function (err, result) {
    if (err) throw err;

    console.log("Text index created.");
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

// {
//   "_id": "64565c93722bbf136350ebc8",
//   "name": "Men's Court Vision Mid Sneaker",
//   "image1": "https://www.famousfootwear.com/blob/product-images/20000/96/05/6/96056_pair_medium.jpg",
//   "image2": "https://www.famousfootwear.com/blob/product-images/20000/96/05/6/96056_right_medium.jpg",
//   "gender": "Male",
//   "size": 12,
//   "price": 2399,
//   "brand": "Eco-Conscious Nike",
//   "id": "34"
// }
