//adding dependencies

const express=require('express');
//port assignment
const PORT=4050;
//using app
const app=express();

app.use(express.json({extended:false}));
//adding routes
const studentRouter=require('./api/routes/student.routes');
const teacherRouter=require('./api/routes/teacher.routes');
const classRouter=require('./api/routes/class.routes');
//student
app.use('/student', studentRouter);
app.use('/teacher',teacherRouter);
app.use('/class', classRouter);
app.listen(PORT,()=>console.log(`listening on ${PORT}`));