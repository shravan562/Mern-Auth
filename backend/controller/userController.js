
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


// Auth user/set token
// route post/api/user/auth
// access public

const authUser =asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
      generateToken(res,user._id)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error('Invalid email or password');
    }

})

// Auth user/set token
// route post/api/user/auth
// access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Name, email, and password are required.');
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      generateToken(res,user._id)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });
  
// Auth user/set token
// route post/api/user/logout
// access public
const logoutUSer =asyncHandler(async (req,res)=>{
  res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0)
  });
  res.status(200).json({message:'User logged out'})
})
// Auth user/set token
// route get/api/user/profile
// access private
const getUserProfile =asyncHandler(async (req,res)=>{
    // Check if req.user exists before trying to access its properties
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, no user found' });
    }
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
    res.status(200).json(user)
})
// Auth user/set token
// route put/api/user/profile
// access public
const updateUserProfile =asyncHandler(async (req,res)=>{
  const user = await User.findById(req.user._id);
  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if(req.body.password){
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    })
  }else{
    res.status(404);
    throw new Error('User not found');

  }
    
})


export {authUser,
    registerUser,
    logoutUSer,
    getUserProfile,
    updateUserProfile
}