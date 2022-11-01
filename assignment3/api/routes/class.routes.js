//adding dependencies
const {addClass}=require('../../class.controller')
const express=require('express');

//adding router
const router=express.Router();



 //adding a class
router.post('/:tchId',(req,res)=>{
   const tchid = req.params.tchId;
   const addclass=addClass(tchid);
   res.send(addclass)
})

module.exports =router;