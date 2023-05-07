const express = require("express");
const productRouter = express.Router();
const { productModel } = require("../models/product.model");
const { CommentModel } = require("../models/comment.model");

//adding products to DB
productRouter.post("/add", async (req, res) => {
  console.log(req.body);
  const { image1, image2, name, brand, size, gender, price } = req.body;
  try {
    const newProduct = new productModel(req.body);
    await newProduct.save();
    res.status(200).send({ msg: "Post is added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//getting all the data of products from DB

//getting all data of products from DB with pagination
productRouter.get("/", async (req, res) => {
  try {
    console.log(req.query);
    let search = req.query.search || "";
    let pageNumber = req.query.pageNumber;
    let limit = req.query.limit;
    const skip = (pageNumber - 1) * limit;
    // productModel.createIndex({ name: "text", brand: "text" });

    // Continue with your queries and other operations here

    const searchQuery = {
      $text: {
        $search: search,
      },
    };
    if (searchQuery.$text.$search === "") {
      // If the search term is empty, remove the $text operator
      delete searchQuery.$text;
    }
    const getProduct = await productModel
      .find(searchQuery)
      .skip(skip)
      .limit(limit);

    console.log(getProduct);
    res.status(200).send(getProduct);
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

// add comments
productRouter.post("/comment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { userID, msg } = req.body;
    const payload = {



      userID,
      productid: id,
      title, rating, description,
      date:new Date()
    }

    const comment = new CommentModel(payload);
    await comment.save();

    res.status(200).send({ msg: "comment is saved" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

productRouter.get("/comments/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await CommentModel.find({ productid: id });

    res.status(200).send({ data });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
module.exports = { productRouter };
