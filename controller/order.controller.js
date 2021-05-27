const Orders = require("../models/order.model");
const Users = require('../models/user.model');


module.exports = {
  AllOrder: async (req, res, next) => {
    try {

      const order = await Orders.find();
      if(!order || order.length === 0) return res.status(400).json({ message: "No item!" });

      res.status(200).json({ count: order.length, orders: order })
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  AddOrder: async (req, res, next) => {
    const newOrder = new Orders({

    })
    try {
      const order = await newOrder.save();
      if(!order) return res.status(400).json({ message: "Something went wrong while saving cart" });
      res.status(200).json({ message: "Add Cart Successfully." })
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
}