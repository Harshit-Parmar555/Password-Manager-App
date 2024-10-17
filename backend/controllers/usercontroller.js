const usermodel = require("../models/usermodel");

exports.userregister = async (req, res) => {
  try {
    const { username, email, password, passwords } = req.body;
    if (!username || !email || !password) {
      return res.status(300).send({
        success: false,
        message: "please fill all the fields",
      });
    }
    const existinguser = await usermodel.findOne({ email });
    if (existinguser) {
      return res.status(299).send({
        success: false,
        message: "user already exist",
      });
    }

    const newuser = new usermodel({ username, email, password });
    newuser.save();
    return res.status(200).send({
      success: true,
      message: "user created successfully",
      newuser,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "error in the user controller",
      error,
    });
  }
};

exports.userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(299).send({
        success: false,
        message: "user not found",
      });
    }
    if (password != user.password) {
      return res.status(299).send({
        success: "passwordincorrect",
        message: "password is incorrect",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user login successfull",
      user,
    });
  } catch (error) {
    return res.status(400).send({
      sucess: false,
      message: "error in the userlogin controller",
      error,
    });
  }
};
