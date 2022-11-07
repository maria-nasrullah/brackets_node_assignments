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
const findAllUsers =async res=>
    {
        const {message,data} = await UserModel.getUsers();
        return res.status(200).json(
            {
                data:data,
                message:message
            })
    }

//get user by id
const findUserById= async (req,res) => 
    {
        const {id} = req.params;
        const {message,data} = await UserModel.getUserById(id);
        return res.status(200).json(
            {
                data:data,
                message:message
            })
    }

//get user by email
const findUserByAttribute =async (req, res) => 
    {
        const user= req.body;
        const {message,data} = await UserModel.getUserByAttribute(user);
        return res.status(200).json(
            {
                data:data,
                message:message
            })
    }

//update user
const updateUser =async (req, res) => 
    {
        const {id} = req.params;
        const {data,message}= await UserModel.changeUser(id,req.body);
        return res.status(200).json(
            {
                data:data,
                message:message
            })
    }

//update many users
const updateManyUsers = async(req, res) =>
    {
        const {data,message}= await UserModel.changeManyUsers(req.body);
        return res.status(200).json(
            {
                data:data,
                message:message
            })
    }

//delete many usrs
const deleteManyUsers= async res => 
    {
        const {message}= await UserModel.removeManyUsers();
        return res.status(200).json(
            {
                message:message
            })
    }

//update one user through body
const updateOneUser =async(req, res) => 
    {
        const {data,message} = await UserModel.changeOneUser(req.body);
        return res.status(200).json(
            {
                data:data,
                message:message
            })
    }

// delete one user without id
const deleteSingleUser=async res =>
    {
        const {message}= await UserModel.removeSingleUser();
        return res.status(200).json(
            { 
                message:message
            })
    }

module.exports={
    addUser,
    findAllUsers,
    findUserById,
    findUserByAttribute,
    updateUser,
    updateManyUsers,
    deleteManyUsers,
    updateOneUser,
    deleteSingleUser,
    };