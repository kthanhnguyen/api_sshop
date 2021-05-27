const Products = require("../models/product.model");

const { productValidation } = require("../middlewares/validation");

module.exports = {
  AllProduct: async (req, res) => {
    try {
      const products = await Products.find();
      if(!products) return res.status(400).json({ message: "No item!" });
      res.status(200).json(products);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  AddProduct: async (req, res) => {
    const { error } = productValidation(req.body);
    if(error) return res.status(400).json({ message: error.details[0].message });

    const name = await Products.findOne({ name: req.body.name });
    if(name) return res.status(400).json({ message: "Name already exists" });

    const newProduct = new Products({
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      rating: req.body.rating,
      sex: req.body.sex,
      color: req.body.color,
      poster: req.body.poster,
      description: req.body.description,
      collections: req.body.collections,
      productType: req.body.productType
    });

    try {
      const product = await newProduct.save();
      if(!product) return res.status(400).json({ message: "Something went wrong while saving product" });
      res.status(200).json({ message: "Add Product Successfully." });
    } catch(err) {
      res.status(400).json({ message: err });
    }
  },
  DeleteProduct: async (req, res) => {
    try {
      const product = await Products.findByIdAndDelete(req.params.id);
      if(!product) return res.status(400).json({ message: "No product found!" });
      res.status(200).json({ message: "Product has deleted!" })
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  UpdateProduct: async (req, res) => {
    try {
      const body = req.body;
      if(!body || Object.keys(body).length === 0) return res.status(400).json({ message: "Body Product not found!" });

      const product = await Products.findByIdAndUpdate(req.params.id, req.body);
      if(!product) return res.status(400).json({ message: "Something went wrong while updating product" });
      
      res.status(200).json({ message: "Product has updated!" });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  FindProduct: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      if(!product) return res.status(400).json({ message: "Product not found!" });
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
}