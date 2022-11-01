const {allStudents,singleStudent,addStudent,editStudent,deleteStudent}=require('../../student.controller')
const express=require('express');
const router=express.Router();

//all students
 router.get('/',(req,res)=>{
    const students=allStudents();
    res.send(students);
 });
 //single student
 router.get('/:stdId',(req,res)=>{
   const stdId=req.params.stdId;
   const student=singleStudent(stdId);
   res.send(student);
 })
 //adding a student
router.post('/',(req,res)=>{
   console.log(req.body);
   const student=req.body;
   console.log(student);
   const addstudent=addStudent(student);
   res.send(addstudent)
})
//delete student
router.delete('/:stdId',(req,res)=>{
   const {stdId}=req.params;
   const student=deleteStudent(stdId);
   res.send(student);
})
//edit student
router.patch('/:stdID',(req,res)=>{
   const {stdID}=req.params;
   const body=req.body;
   const student=editStudent(stdID,body);
   res.send(student)
})



module.exports =router;