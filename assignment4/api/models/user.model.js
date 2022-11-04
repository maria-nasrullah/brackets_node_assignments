//adding dependencies
const mongoose = require("mongoose");
const User= require('../schemas/user.schemas');

//create user
const createUser= async body=>
    {
        const user=new User(
            {
                _id: mongoose.Types.ObjectId(),
                name:body.name,
                age:body.age,
                email:body.email,
                isMarried:body.isMarried,
            });
            
        const createdUser= await user.save();
        return {
            data:createdUser,
            message:"Sucessfully created user"
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

//get user by id
const getUserById= async(id)=>
    {
        try{
            const user=await User.findById(id);
            return {
                data:user,
                message:"Sucessfully get user"
            }
        }
        catch(err){
            console.log(err);
        }
    }

//get user by age
const getUserByAttribute= async(userBody)=>
    {
        try{
            const user=await User.findOne({age:userBody.age},'name');
            return {
                data:user,
                message:"Sucessfully get user"
            }
        }
        catch(err){
            console.log(err)
        }
    }

//updateUser by id
const changeUser= async(id,body)=>
    {
        try{
            const user=await User.findByIdAndUpdate(id,body,{new:true});
            return {
                data:user,
                messsage:"Successfully updated user",    
            }
        }
        catch(err){
            console.log(err)
        }
    }

//update many users
const changeManyUsers=async (userBody)=>
    {
        try{
            const users=await User.updateMany({name:/^A/},userBody);
            return{
                messsage:"Successfully updated many users",
                data:users
            }
        }
        catch(err){
            console.log(err);
        }
    }

//delete many users
const removeManyUsers=async ()=>
    {
        try{
            const users=await User.deleteMany({age:20});
            return{
                messsage:"Successfully deleted many users"
            }
        }
        catch(err){
            console.log(err)
        }
    }

//update one user via body
const changeOneUser= async(userBody)=>
    {
        try{
            const user=await User.findOneAndUpdate({name:"Fareeha"},userBody,{new:true});
            return {
                data:user,
                messsage:"Sucessfully updated user"
            }
        }
        catch(err){
            console.log(err)
        }
    }


module.exports ={
    createUser,
    getUsers,
    getUserById,
    getUserByAttribute,
    changeUser,
    changeManyUsers,
    removeManyUsers,
    changeOneUser
    };