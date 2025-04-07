const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
        companyName: {
                type: String,
                required: true,
                trim: true,
        },
        description: {
                type: String,
                // required: true,

        },
        website: {
                type: String,
                // required: true,
        },
        location: {
                type: String,
                // required: true,
                trim: true,
        },
        logo: [
                // {
                //         type: mongoose.Schema.Types.ObjectId,
                //         // required: true,
                //         ref: "User",
                // }
                {
                        type: String,
                        // required: true,
                }
        ],
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
               
        }

}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);