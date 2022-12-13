//adding dependencies
const os =require('os')
const express=require('express');
const path=require('path')
//port assignment
const PORT=4050;
//using app
const app=express();

//os
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

// console.log(platform,architecture,hostname,cpus,endianness,freemem,type,networkInterfaces,release,totoalmem,loadavg,tmpdir,uptime,userInfo,constants,eol);
app.use(express.json({extended:false}));
//adding routes
const studentRouter=require('./api/routes/student.routes');
const teacherRouter=require('./api/routes/teacher.routes');
const classRouter=require('./api/routes/class.routes');
//student
app.use('/student', studentRouter);
app.use('/teacher',teacherRouter);
app.use('/class', classRouter);

//path
const basename=path.basename('Users/admin/profile.js')  //Returns the last part of a path
const dirname=path.dirname('Users/admin/profile.js')   //returns the directories of a path
const extname=path.extname('Users/admin/profile.js')    //Returns the file extension of a path
var obj = { dir: 'C:\\Users\\Refsnes', base: 'demo_path.js' }
const  format=path.format(obj) //Formats a path object into a path string
const delimiter=path.delimiter  //Returns the delimiter specified for the platform
const isAbsolute=path.isAbsolute('User/admin/profile.js')
const ifAbsolute=path.isAbsolute('/User/admin/profile.js')
const pAbsolute=path.isAbsolute(format)
var join = path.join('Users', 'Refsnes', 'demo_path.js');
var normalize = path.normalize('Users/Refsnes/../Jackson'); //cuts the inner directories in normalized path
const parse=path.parse("Users/admin/profile.js")
const s='User/admin/profile.js';
const resolve=path.resolve(s)   //appends with current path
const relative=path.relative(s,format)  //change a string path into anthoer
const posix=path.posix  //Returns an object containing POSIX specific properties and methods
const win32=path.win32  //Returns an object containing Windows specific properties and methods
const sep=path.sep  //Returns the segment separator specified for the platform

// console.log(basename,dirname,extname,format,delimiter,isAbsolute,ifAbsolute,pAbsolute,join,normalize,parse,resolve,relative,posix,win32,sep);


app.listen(PORT,()=>console.log(`listening on ${PORT}`));