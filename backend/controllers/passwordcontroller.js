const mongoose = require("mongoose");
const passwordmodel = require("../models/password");
const usermodel = require("../models/usermodel");
exports.createpassword = async (req, res) => {
  try {
    const { website, websiteusername, websitepassword, user } = req.body;
    if (!website || !websiteusername || !websitepassword || !user) {
      return res.status(400).send({
        success: false,
        message: "please fill all the fields",
      });
    }
    const existuser = await usermodel.findById(user);
    if (!existuser) {
      return res.status(400).send({
        sucess: false,
        message: "user not found in the create password controller",
      });
    }

    const password = new passwordmodel({
      website,
      websiteusername,
      websitepassword,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await password.save({ session });
    existuser.passwords.push(password);
    await existuser.save({ session });
    await session.commitTransaction();
    await password.save();
    return res.status(200).send({
      success: true,
      message: "new password created successfully",
      password,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in the create password controller",
      error,
    });
  }
};

exports.deletepassword = async (req, res) => {
  try {
    const password = await passwordmodel.findById(req.params.id);
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "password collection not found",
      });
    }
    const deletepassword = await passwordmodel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await deletepassword.user.passwords.pull(password);
    await deletepassword.user.save();
    return res.status(200).send({
      success: true,
      message: "password collection deleted succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in the delete password controller",
      error,
    });
  }
};

exports.getpasswords = async (req, res) => {
  try {
    const user = await usermodel
      .findById(req.params.user)
      .populate("passwords");
    if (!user) {
      return res.status(299).send({
        success: false,
        message: "passwords not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user passwords found",
      user,
    });
  } catch (error) {
    console.log("error in get password api" + error);
  }
};
