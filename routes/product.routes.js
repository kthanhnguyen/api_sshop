const express = require('express');
const router = express.Router();

const ProductsControllers = require('../controller/product.controller');

router.get('/all', ProductsControllers.AllProduct);

router.post('/add', ProductsControllers.AddProduct);

router.delete('/delete/:id', ProductsControllers.DeleteProduct);

router.patch('/update/:id', ProductsControllers.UpdateProduct);

router.get('/find/:id', ProductsControllers.FindProduct);

module.exports = router;