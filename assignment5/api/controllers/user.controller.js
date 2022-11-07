//adding dependencies
const UserModel= require('../models/user.model');

//create user
const addUser= async (req,res) => 
    {
        const {data,message}= await UserModel.createUser(req.body);
        return res.status(201).json(
            {
                data:data,
                message:message
            })
    };

//get Users
const findAllUsers =async (req,res)=>
    {
        const {message,data} = await UserModel.getUsers();
        return res.status(200).json(
            {
                data:data,
                message:message
            })
    }

//get Users
const findActiveUsers =async (req,res)=>
{
    const {message,data} = await UserModel.getActiveUsers();
    return res.status(200).json(
        {
            data:data,
            message:message
        })
}


module.exports={
    addUser,
    findAllUsers,
    findActiveUsers,
    };
    