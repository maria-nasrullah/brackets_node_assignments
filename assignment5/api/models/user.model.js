//adding dependencies
const mongoose = require("mongoose");
const User= require('../schemas/user.schemas');

//create user
const createUser= async body=>
    {
        if(body.userType==='/Customer/i'||body.userType==='/Admin/i'){
            const user=new User(
                {
                    _id: mongoose.Types.ObjectId(),
                    firstName:body.firstName,
                    lastName:body.lastName,
                    email:body.email,
                    phoneNumber:body.phoneNumber,
                    city:body.city,
                    state:body.state,
                    zipCode:body.zipCode,
                    status:body.status,
                    userType:body.userType,
                    payment:body.payment,
                });
    
            const createdUser= await user.save();
            return {
                data:createdUser,
                message:"Sucessfully created user"
            }
        }
        else{
            return {
                data:null,
                message:"useType should be admin or customer"
            }
        }
       
    }

//get users
const getUsers= async()=>
    {
        try{
            const users=await User.find();
            return {
                data:users,
                message:"Sucessfully get users"
            }
        }
        catch(err){
            console.log(err);
        }
    }

//get active users
const getActiveUsers= async()=>
{
    try{
        const users=await User.find({status:{$eq: "Active"}});
        return {
            data:users,
            message:"Sucessfully get active users"
        }
    }
    catch(err){
        console.log(err);
    }
}


module.exports ={
    createUser,
    getUsers,
    getActiveUsers,
    }; 
    