const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type :String,
       
        trim:true,
    },
    email:{
        type:String,
    
    },
    phoneNumber:{
        type:Number,
        
    },
    password:{
        type:String,
        

    },
    role:{
        type:String,
       
        enum:["Student", "Recruiter"]
    },
    // profile: 
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         required: true,
    //         ref: "Profile",
    //     }
   

    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{
            type:String,
            default:""
        }
    },

  
});

module.exports = mongoose.model("User", userSchema);