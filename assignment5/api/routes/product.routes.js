//adding dependencies
const express=require('express');
const productController =require('../Controllers/product.controller');

//use router
const router =express.Router();

//creating product
router.post('/create',productController.addProduct);

//find existing products
router.get('/all',productController.findAllProducts);


module.exports=router;