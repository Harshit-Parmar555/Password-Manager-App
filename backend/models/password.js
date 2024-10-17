const mongoose = require("mongoose");

const passwordschema = new mongoose.Schema({
  website: {
    type: String,
    required: [true, "website is required"],
  },
  websiteusername: {
    type: String,
    required: [true, "websiteusername is required"],
  },
  websitepassword: {
    type: String,
    required: [true, "websitepassword is required"],
  },
  user :{
    type : mongoose.Types.ObjectId,
    ref : "user",
  }
});

const passwordmodel = mongoose.model("password", passwordschema);

module.exports = passwordmodel;
