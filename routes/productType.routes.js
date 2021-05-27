const express = require('express');
const router = express.Router();

const uploadFile = require("../middlewares/uploadImage");

const ProductTypeControllers = require('../controller/productType.controller');

router.get('/all', ProductTypeControllers.AllProductType);

router.post('/add', uploadFile.single('typeImg'), ProductTypeControllers.AddProductType);

router.delete('/delete/:id', ProductTypeControllers.DeleteProductType);

router.patch('/update/:id', ProductTypeControllers.UpdateProductType);

module.exports = router;