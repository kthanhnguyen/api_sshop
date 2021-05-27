const ProductTypes = require("../models/productType.model");

const { productTypeValidation } = require("../middlewares/validation");

module.exports = {
  AllProductType: async (req, res) => {
    try {
      const productType = await ProductTypes.find();
      if(!productType) return res.status(400).json({ message: "No item!" });
      res.status(200).json(productType);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  AddProductType: async (req, res) => {
    const { error } = productTypeValidation(req.body);
    if(error) return res.status(400).json({ message: error.details[0].message });

    const typeName = await ProductTypes.findOne({ typeName: req.body.typeName });
    if(typeName) return res.status(400).json({ message: "Type name already exists" });

    const newProductType = new ProductTypes({
      typeName: req.body.typeName,
      typeImg: req.file ? req.file.path.replace('uploads\\', "/files/") : req.body.typeImg
    });

    try {
      const productType = await newProductType.save();
      if(!productType) return res.status(400).json({ message: "Something went wrong while saving product type" });
      res.status(200).json({ message: "Add Product Type Successfully." });
    } catch(err) {
      res.status(400).json({ message: err });
    }
  },
  DeleteProductType: async (req, res) => {
    try {
      const productType = await ProductTypes.findByIdAndDelete(req.params.id);
      if(!productType) return res.status(400).json({ message: "Not found!" });
      res.status(200).json({ message: "Product Type has deleted!" })
    } catch (err) {
      res.status(400).json({ message: err });
    }
  },
  UpdateProductType: async (req, res) => {
    try {
      const body = req.body;
      if(!body || Object.keys(body).length === 0) return res.status(400).json({ message: "Body Not found!" });

      const productType = await ProductTypes.findByIdAndUpdate(req.params.id, req.body);
      if(!productType) return res.status(400).json({ message: "Something went wrong while updating product" });
      
      res.status(200).json({ message: "Product Type has updated!" });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
}