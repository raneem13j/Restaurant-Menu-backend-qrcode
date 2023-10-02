import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = "123456";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("req.body:", req.body);

    if(!password || password.length < 6 ){
        res.status(400).json({ message: "Password less than 6 characters" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
   

    const maxAge = 3 * 60 * 60;

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      jwtSecret,
      {
        expiresIn: maxAge,
      }
    );
    res.cookie({
      httpOnly: true,
      maxAge: maxAge * 1000, // 3hrs in ms
    });
    res.status(201).json({
      message: "User successfully created",
      userId: user._id,
      token: token,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not successful created",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  // Check if username and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, email, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully Logged in",
            user: user._id,
            token: token,
            role: user.role,
          });
        } else {
          res.status(400).json({ message: "Login not succesful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "User successfully logged out" });
};

export const activateUser = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    // Mark the user as activated
    user.activate = true; // Set the activate field to null or remove it, depending on your schema

    await user.save();

    res.status(200).json({
      message: 'User activated successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error activating user',
      error: error.message,
    });
  }
};

export const getAllUser = async (req,res)=>{
   try{

    const users = await User.find();
    res.status(200).json(users);
   }catch(error){
    res.status(500).json({ message: "Internal Server Error" });
   }
 
};
