const express = require("express");
const productRouter = express.Router();
const jwt = require("jsonwebtoken");
const { productModel } = require("../models/product.model");

//adding products to DB
productRouter.post("/add", async (req, res) => {
  console.log(req.body);
  const { name, brand, size, gender, price } = req.body;
  try {
    const newProduct = new productModel(req.body);
    await newProduct.save();
    res.status(200).send({ msg: "Post is added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//getting data of products from DB
productRouter.get("/", async (req, res) => {
  try {
    console.log(getPost);
    res.status(200).send(getPost);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//updating the products

productRouter.patch("/update/:id", async (req, res) => {
  let id = req.params.id;
  console.log(req.body, id);
  try {
    await productModel.findByIdAndUpdate(id, req.body);

    res.status(200).send({ msg: "Product is update" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//deleting the products
productRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await productModel.findByIdAndDelete({ _id: id });

    res.status(200).send({ msg: "Product is deleted" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
module.exports = { productRouter };
