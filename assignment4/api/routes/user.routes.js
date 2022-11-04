//adding dependencies
const express=require('express');
const userController =require('../Controllers/user.controller');

//use router

const router =express.Router();
//creating user
router.post('/create',userController.addUser);
//find existing users

router.get('/all',userController.findAllUsers);
//find user by id
 router.get('/:id',userController.findUserById);
//find user by email
 router.post('/single',userController.findUserByAttribute);
//update User
router.patch('/update/:id',userController.updateUser);
//update many users
router.patch('/updatemany',userController.updateManyUsers);
//delete many users
router.delete('/deletemany',userController.deleteManyUsers);
module.exports=router;










