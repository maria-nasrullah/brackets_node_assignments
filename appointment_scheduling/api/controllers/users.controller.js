//adding dependences
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { v4: uuid4 } = require("uuid");
const { randomBytes: randomBytesCb } = require("crypto");
const { promisify } = require("util");

//importing services
const users = require("../services/users.services");

//creating twilio client
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_ACCOUNT_AUTH_TOKEN
);

const randomBytes = promisify(randomBytesCb);

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

//login user -- part1
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

    console.log(matchedUser.phoneNumber);
    const buff = await randomBytes(5);
    const OTP = buff.toString("hex");

    console.log(`${buff.length} sized OTP generated as ${OTP}`);

    //message sending
    const sentSMS = await client.messages.create({
      body: OTP,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: matchedUser.phoneNumber,
    });

    //updating user doc
    const updatedUser = await users.updateUser(matchedUser._id, { OTP });

    res.status(200).json({
      message: "Please enter the OTP",
      userId: updatedUser,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

//login user -- part2
const OTPVerification = async (req, res) => {
  try {
    const { userId } = req.params;
    const { OTP } = req.body;
    const verifiedUser = await users.verifyOTP(userId, OTP);
    if (!verifiedUser) {
      return res.status(401).json({
        message: "Verification failed",
      });
    }

    //embedding token
    const uniqueKey = uuid4();
    const payload = {
      _id: verifiedUser._id,
      firsName: verifiedUser.firstName,
      lastName: verifiedUser.lastName,
      email: verifiedUser.email,
      userName: verifiedUser.userName,
      password: verifiedUser.password,
      number: verifiedUser.number,
      address: verifiedUser.address,
      uniqueKey,
    };
    const token = JWT.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "12hr",
    });

    //saving unique key
    const matchedUserId = verifiedUser._id.toString();
    const toBeUpdate = { $addToSet: { uniqueKeys: uniqueKey }, OTP: "" };
    const updatedUser = await users.updateUser(matchedUserId, toBeUpdate);

    if (updatedUser) {
      res.status(200).json({
        messsage: "login successful",
        token,
      });
    }
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

//logout user
const logout = async (req, res) => {
  try {
    const { user } = req;
    const { token } = req;
    const uniqueKey = token.uniqueKey;
    // const uniqueKeys = user.uniqueKeys.filter((key) => uniqueKey !== key);
    const userId = user._id.toString();
    // const toBeUpdate = { uniqueKeys };
    //assignment
    const toBeUpdate = { uniqueKeys: [] };
    const updatedUser = await users.updateUser(userId, toBeUpdate);
    if (updatedUser) {
      res.status(200).json({
        message: "you are logged out",
      });
    }
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
      message: "Updated User",
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
      message: "uploaded",
      updatedUser,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const toBeUpdate = req.body;
    const updatedUser = await users.updateUser(userId, toBeUpdate);
    if (!updatedUser) {
      res.status(401).json({
        message: "Updation Failed",
      });
    }
    res.status(200).json({
      message: "Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

// remove user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await users.removeUser(userId);
    res.status(200).json({
      message: "User deleted Successfully",
      deletedUser,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

module.exports = {
  register,
  login,
  update,
  uploadProfileImage,
  logout,
  OTPVerification,
  updateUser,
  deleteUser,
};
