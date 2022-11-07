//adding dependencies
const express=require('express');
const orderController =require('../Controllers/order.controller');

//use router
const router =express.Router();

//creating order
router.post('/create',orderController.addOrder);

//find existing orders
router.get('/all',orderController.findAllOrders);

//find aggregated orders
router.get('/specific',orderController.findSpecificOrders);


module.exports=router;