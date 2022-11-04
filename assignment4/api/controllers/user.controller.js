//adding dependencies
const UserModel= require('../models/user.model');

//create user
const addUser= async (req,res,next) => {
    const {name,age,email,isMarried} = req.body
    const {status,data,message}= await UserModel.createUser(req.body);
    return res.status(201).json(
            {
                status,
                data,
                message
            })

};
//get Users
const findAllUsers =async (req,res,next)=>{
const {message,data} = await UserModel.getUsers();
return res.status(200).json({
    message,data
})
}
//get user by id
const findUserById= async (req,res,next) => {
    const {id} = req.params;
    const {message,data} = await UserModel.getUserById(id);
    return res.status(200).json({
        message,
        data
    })
}
//get user by email
const findUserByAttribute =async (req, res,next) => {
    const user= req.body;
    const {message,data} = await UserModel.getUserByAttribute(user);
    return res.status(200).json({
        message,
        data})
}

//updata user
const updateUser =async (req, res,next) => {
    const {id} = req.params;
    const {data,message}= await UserModel.changeUser(id,req.body);
    return res.status(200).json({
            message,
            data,
        })
    }
//update many users
const updateManyUsers = async(req, res, next) =>{
    const {data,message}= await UserModel.changeManyUsers(req.body);
    return res.status(200).json({
            message,
            data,
        })
}
//delete many usrs
const deleteManyUsers= async (req, res,next) => {
    const {message}= await UserModel.removeManyUsers();
    return res.status(200).json({
            message,
        })

}

module.exports={addUser,findAllUsers,findUserById,
    findUserByAttribute,updateUser,updateManyUsers,deleteManyUsers};