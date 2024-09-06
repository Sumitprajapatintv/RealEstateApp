import User from "../model/user.model.js";
export const signUp = async (req, res, next) => {
  const { userName, email, password } = req?.body;
  const newUser = new User({ userName, email, password });
  try {
    await newUser.save();
    res.status(200).json("Created Succuessfully");
  } catch (error) {
    next(error);
  }
};
