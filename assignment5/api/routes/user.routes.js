//adding dependencies
const express=require('express');
const userController =require('../Controllers/user.controller');

//use router
const router =express.Router();

//creating user
router.post('/create',userController.addUser);

//find existing users
router.get('/all',userController.findAllUsers);

//find active users
router.get('/active',userController.findActiveUsers);


module.exports=router;