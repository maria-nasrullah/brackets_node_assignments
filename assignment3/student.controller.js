//adding dependencies
const fs= require('fs');
//readingfile
let students = fs.readFileSync('./api/data/students.json','utf-8');
students=JSON.parse(students)
// //all students
const allStudents=()=> students;
//single student
const singleStudent = studentId => {
    studentId = Number(studentId)
    return students.find(student => student.id === studentId)
  }
 //creating new student
 const addStudent = student => {
    students.push(student);
    console.log(students);
    fs.writeFileSync('./api/data/students.json', JSON.stringify(students), 'utf-8');
    return 'SUCCESS: teacher added';
  }
  
  //deleting a student
  const deleteStudent=(stdId)=>{
    stdId=Number(stdId)
     students=students.filter(std=>std.id!==stdId);
     fs.writeFileSync('./api/data/students.json', JSON.stringify(students), 'utf-8');
     return 'deleted';
  }
//edit student

const editStudent=(stdId,body)=>{
    stdId=Number(stdId);
    const student=students.find(student=>student.id==stdId);
    student.id=body.id?body.id:student.id;
    student.name=body.name?body.name:student.name;
    student.age=body.age?body.age:student.age;
    student.email=body.email?body.email:student.email;
    fs.writeFileSync('./api/data/students.json', JSON.stringify(students), 'utf-8');
 return "updated";   
    }
 module.exports={allStudents,singleStudent,addStudent,deleteStudent,editStudent};