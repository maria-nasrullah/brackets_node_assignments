//adding dependencies
const os =require('os')
const express=require('express');
//port assignment
const PORT=4050;
//using app
const app=express();
const platform=os.platform();
const architecture=os.arch();   //	Returns the operating system CPU architecture
const hostname=os.hostname();   //Returns the hostname of the operating system
const cpus=os.cpus()    //Returns an array containing information about the computer's CPUs
const endianness=os.endianness();//Endianness is a term that describes the order in which a sequence of bytes is stored in computer memory.
const freemem=os.freemem()  //Returns the number of free memory of the system
const type=os.type()    // Returns the name of the operating system
const release =os.release() //Returns information about the operating system's release
const totoalmem=os.totalmem()   //Returns the number of total memory of the system
 const networkInterfaces=os.networkInterfaces()   //Returns the network interfaces that has a network address
 const loadavg=os.loadavg()   //Returns an array containing the load averages, (1, 5, and 15 minutes)
const tmpdir=os.tmpdir()    //Returns the operating system's default directory for temporary files
const uptime=os.uptime() //Returns the uptime of the operating system, in seconds
const userInfo=os.userInfo( )//Returns information about the current user)
const constants=os.constants    //Returns an object containing the operating system's constants for process signals, error cotes etc.
const eol=os.EOL  //Returns the end-of-line marker for the current operating system

console.log(platform,architecture,hostname,cpus,endianness,freemem,type,networkInterfaces,release,totoalmem,loadavg,tmpdir,uptime,userInfo,constants,eol);
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