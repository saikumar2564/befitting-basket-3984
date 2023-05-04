const express = require("express");
const orderRouter = express.Router();
const { orderModel } = require("../models/order.model");

//adding orders to DB
orderRouter.post("/add", async (req, res) => {
  console.log(req.body);
  try {
    const newOrder = new orderModel(req.body);
    await newOrder.save();
    res.status(200).send({ msg: "the order is added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//getting all the data of orders from DB
orderRouter.get("/", async (req, res) => {
  try {
    const getOrder = await orderModel.find();
    console.log(getOrder);
    res.status(200).send(getOrder);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
//updating the order

orderRouter.patch("/update/:id", async (req, res) => {
  let id = req.params.id;
  console.log(req.body, id);
  try {
    await orderModel.findByIdAndUpdate(id, req.body);

    res.status(200).send({ msg: "Order is update" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//deleting the order
orderRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await orderModel.findByIdAndDelete({ _id: id });

    res.status(200).send({ msg: "Order is deleted" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
module.exports = { orderRouter };
