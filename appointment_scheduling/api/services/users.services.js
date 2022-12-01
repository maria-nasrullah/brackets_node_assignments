//importing model
const userModel = require("../models/users");

//creating user object
const createUser = async (user) => {
  try {
    const newUser = new userModel(user);
    return await newUser.save();
  } catch (error) {
    throw error;
  }
};

//finding user by email
const getExistingUser = async ({ email, userName }) => {
  try {
    const existedUser = await userModel
      .findOne({
        $or: [{ email: { $eq: email } }, { userName: { $eq: userName } }],
      })
      .lean();
    return existedUser;
  } catch (error) {
    throw error;
  }
};

//finding user by id
const getUserById = async (userId) => {
  try {
    return await userModel.findById(userId).select("-password").lean();
  } catch (error) {
    throw error;
  }
};

//update user's any field
const updateUser = async (userId, toBeUpdate) => {
  try {
    return await userModel
      .findByIdAndUpdate(userId, toBeUpdate, { new: true })
      .lean();
  } catch (error) {
    throw error;
  }
};

const verifyOTP = async (userId, OTP) => {
  try {
    const user = await userModel
      .findOne({ _id: userId, OTP })
      .lean()
      .select("-password");
    console.log("Verified User");
    return user;
  } catch (error) {
    throw error;
  }
};


//remove user  __ADMIN
const removeUser=async(userId)=>{
  try {
    return await userModel.findByIdAndRemove(userId);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getExistingUser,
  getUserById,
  updateUser,
  verifyOTP,
  removeUser,
};
