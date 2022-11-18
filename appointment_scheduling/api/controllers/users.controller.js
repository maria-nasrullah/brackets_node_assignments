//adding dependences
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

//importing services
const users = require("../services/users.services");

//importing secret key
const { secretKey } = require("../../config/credentials");

//methods

//register user
const register = async (req, res) => {
  try {
    const user = req.body;

    //if user exists?
    const existedUser = await users.getExistingUser({
      email: user.email,
      userName: user.userName,
    });
    if (existedUser) {
      return res.status(401).json({
        message: "User Name or email already taken",
      });
    }

    //hashing password
    const slat = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, slat);
    user["password"] = hashedPassword;

    // creating user
    const createdUser = await users.createUser(user);
    res.status(201).json({
      message: "User created successfully",
      createdUser,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      error: "INTERNAL SERVER ERROR",
    });
  }
};

//login user
const login = async (req, res) => {
  try {
    const { email, userName, password } = req.body;

    //getting matched user
    const matchedUser = await users.getExistingUser({
      email,
      userName,
      password,
    });
    if (!matchedUser) {
      res.status(400).json({
        message: "Incorrect Credentials",
      });
    }

    //checking password
    const matchedPassword = await bcrypt.compare(
      password,
      matchedUser.password
    );
    if (!matchedPassword) {
      res.status(400).json({
        message: "Incorrect Credentials",
      });
    }

    //embedding token
    const payload = {
      _id: matchedUser._id,
      firsName: matchedUser.firstName,
      lastName: matchedUser.lastName,
      email: matchedUser.email,
      userName: matchedUser.userName,
      password: matchedUser.password,
      number: matchedUser.number,
      address: matchedUser.address,
    };
    const token = JWT.sign(payload, secretKey, { expiresIn: "12hr" });

    res.status(200).json({
      messsage: "login successful",
      token,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

//update any field of user by id
const update = async (req, res) => {
  try {
    const { userId } = req.params;
    const toBeUpdate = req.body;
    const updatedUser = await users.updateUser(userId, toBeUpdate);
    res.status(200).json({
      msg: "Updated User",
      updatedUser,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

//uploading dp
const uploadProfileImage = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fileName } = req;
    const toBeUpdate = {
      profileImage: `uploads/${fileName}`,
    };

    const updatedUser = await users.updateUser(userId, toBeUpdate);
    res.status(200).json({
      msg: "uploaded",
      updatedUser,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

module.exports = { register, login, update, uploadProfileImage };
