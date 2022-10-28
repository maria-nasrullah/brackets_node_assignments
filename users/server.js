const express=require('express');
const app=express();
const PORT=3050;
const {listUsers,getUser,addUser,deleteUser,editUser,updateUser}=require('./users.js')
app.use(express.json({extended:false}))
// getting all users

app.get('/users',(req,res)=>{
   let users=listUsers()
    res.send(users);
})
// getting single user using @param user
app.get('/users/:userID',(req,res)=>{
    const {userID}=req.params;
    const user=getUser(userID);
    console.log(user)
    res.send(user);
})

//adding a user

app.post('/users',(req,res)=>{
    const user=req.body
    const adduser=addUser(user);
    res.send(adduser)
})

//delete user

app.delete('/users/:userID',(req,res)=>{
    const {userID}=req.params;
    const user=deleteUser(userID);
    res.send(user);
})
//edit user patch
app.patch('/users/:userID',(req,res)=>{
    const {userID}=req.params;
    const body=req.body;
    console.log(body)
    const user=editUser(userID,body);
    res.send(user)
})
//edit user put
app.put('/users/:userID',(req,res)=>{
    const {userID}=req.params;
    const body=req.body;
    console.log(body)
    const user=updateUser(userID,body);
    res.send(user)
})
app.listen(PORT,()=>console.log(`listing on port ${PORT}`))