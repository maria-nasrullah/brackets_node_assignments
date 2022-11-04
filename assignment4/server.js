//adding dependencies
const express=require('express');
const mongoose=require('mongoose');

//using app
const app=express();
//port assignment
const PORT=4070;
//writing purpose
app.use(express.json({extended:false}));
//adding routes
const userRouter= require('./api/routes/user.routes');
//user
app.use('/users', userRouter);
//connection to db
const mongoUrl=`mongodb+srv://marianasrullah:marianasrullah@cluster0.dogpf8f.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log(error);
    console.log("connection failed");
  });
//server listening
app.listen(PORT,()=>console.log(`listening on ${PORT}`));