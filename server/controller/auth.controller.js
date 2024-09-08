import User from "../model/user.model.js";
export const signUp = async (req, res, next) => {
  const { userName, email, password } = req?.body;
  const newUser = new User({ userName, email, password });
  try {
    console.log("skdh");
    await newUser.save();
    res.status(200).json("Created Succuessfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
