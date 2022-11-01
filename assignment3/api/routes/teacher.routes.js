const {allteachers,singleteacher,addTeacher,editteacher,deleteteacher}=require('../../teacher.controller')
const express=require('express');
const router=express.Router();

//all teachers
 router.get('/',(req,res)=>{
    const teachers=allteachers();
    res.send(teachers);
 });
 //single teacher
 router.get('/:tchId',(req,res)=>{
   const tchId=req.params.tchId;
   const teacher=singleteacher(tchId);
   res.send(teacher);
 })
 //adding a teacher
router.post('/',(req,res)=>{
   console.log(req.body);
   const teacher=req.body;
   console.log(teacher);
   const addteacher=addTeacher(teacher);
   res.send(addteacher)
})
//delete teacher
router.delete('/:tchId',(req,res)=>{
   const {tchId}=req.params;
   const teacher=deleteteacher(tchId);
   res.send(teacher);
})
//edit teacher
router.patch('/:tchID',(req,res)=>{
   const {tchID}=req.params;
   const body=req.body;
   const teacher=editteacher(tchID,body);
   res.send(teacher)
})



module.exports =router;