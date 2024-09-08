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
      console.log(process.env.JWT_SECRET);
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
