const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
    },
  ],
  resume: {
    type: String,
  },
  resumeOriginalName:{
    type:String
  },
  profilePhoto: {
    type: String, 
    default:""
  },
  company: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
  ],
});

module.exports = mongoose.model("Profile", profileSchema);
