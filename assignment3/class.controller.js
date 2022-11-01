//adding dependencies
const fs = require('fs');
//readingfile
let teachers = fs.readFileSync('./api/data/teachers.json','utf-8');
let students = fs.readFileSync('./api/data/students.json','utf-8');
let classes= fs.readFileSync('./api/data/classes.json','utf-8');
//parsing
students=JSON.parse(students)
teachers=JSON.parse(teachers)
classes=JSON.parse(classes)
//getting students's and teacher's id
const studentsIds=students.map(std=>std.id);

 //creating new class
 const addClass = (teacherId) => {
    teacherId=Number(teacherId);
    const teacher=teachers.find(tch=>tch.id===teacherId);
    if(teacher!==undefined)
    {
       const newclass={
        TeacherId:teacher.id,Students:studentsIds
       }
        classes.push(newclass);
        fs.writeFileSync('./api/data/classes.json', JSON.stringify(classes), 'utf-8');
        return 'SUCCESS: class created';
    }else
    {
        return 'ERROR: teacher not found';
    }
    
    
    
   
  }
  
 module.exports={addClass};