const express = require('express');
const router = express.Router();

const OrdersControllers = require('../controller/order.controller');

router.get('/all', OrdersControllers.AllOrder);

router.post('/add', OrdersControllers.AddOrder);

// router.delete('/delete/:id', ProductsControllers.DeleteProduct);

// router.patch('/update/:id', ProductsControllers.UpdateProduct);

// router.get('/find/:id', ProductsControllers.FindProduct);

module.exports = router;