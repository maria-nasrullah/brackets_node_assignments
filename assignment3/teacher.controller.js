//adding dependencies
const fs= require('fs');
//readingfile
let teachers = fs.readFileSync('./api/data/teachers.json','utf-8');
teachers=JSON.parse(teachers)
//all teachers
const allteachers=()=> teachers;
//single teacher
const singleteacher = teacherId => {
    teacherId = Number(teacherId)
    return teachers.find(teacher => teacher.id === teacherId)
  }
 //creating new teacher
 const addTeacher = teacher => {
    teachers.push(teacher);
    fs.writeFileSync('./api/data/teachers.json', JSON.stringify(teachers), 'utf-8');
    return 'SUCCESS: teacher added';
  }
  
  //deleting a teacher
  const deleteteacher=(tchId)=>{
    tchId=Number(tchId)
     teachers=teachers.filter(tch=>tch.id!==tchId);
     fs.writeFileSync('./api/data/teachers.json', JSON.stringify(teachers), 'utf-8');
     return 'deleted';
  }
//edit teacher

const editteacher=(tchId,body)=>{
    tchId=Number(tchId);
    const teacher=teachers.find(teacher=>teacher.id==tchId);
    teacher.id=body.id?body.id:teacher.id;
    teacher.name=body.name?body.name:teacher.name;
    teacher.age=body.age?body.age:teacher.age;
    teacher.email=body.email?body.email:teacher.email;
    teacher.subject=body.subject?body.subject:teacher.subject;
    fs.writeFileSync('./api/data/teachers.json', JSON.stringify(teachers), 'utf-8');
 return "updated";   
    }
 module.exports={allteachers,singleteacher,addTeacher,deleteteacher,editteacher};