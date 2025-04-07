const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    requirements: [{
        type: String,
    }],
    salary: {
        type: Number,
        required: true,

    },
    location: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    experienceLevel: {
        type: String,
    },
    position: {
        type: Number,
    },
    company: [ //companyId
        {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Company",
        }
    ],created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    
    // created_by: [
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         required: true,
    //         ref: "User",
    //     }
    // ],
    applications: [
        {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Application",
        }
    ],

},{timestamps:true});

module.exports = mongoose.model("Job", jobSchema);