import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signUp = async (req, res, next) => {
  const { userName, email, password } = req?.body;
  const hashed = await bcrypt.hash(password, 8)
  const newUser = new User({ userName, email, password:hashed });
  try {
    await newUser.save();
    res.status(200).json("Created Succuessfully");
  } catch (error) {
    console.log(error); 
    next(error);
  }
};
export const singin=async(req,res,next)=>{
    try {
      const { email, password } = req.body;
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const correctPassword=bcrypt.compareSync(password,validUser.password);
      if(!correctPassword) return next(errorHandler(404,"Password Inccorect!"));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);  
    } catch (error) {
      console.log(error);
      next(error)
    }
}

export const google=async(req,res,next)=>{
  try {
    const { name,email, photo } = req.body;
    const user = await User.findOne({ email });
    if(user)
    {
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res
    .cookie('access_token', token, { httpOnly: true })
    .status(200)
    .json(rest);  
    }
    else{
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({ userName: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photo });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

    } 
  } catch (error) {
    console.log(error);
    next(error)
  }
}

export const signout=async(req,res,next)=>{
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
}
