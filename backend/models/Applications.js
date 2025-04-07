// const mongoose = require("mongoose");

// const applicationsSchema = new mongoose.Schema({
//   job: [
//       {
//           type:mongoose.Schema.Types.ObjectId,
//           required: true,
//           ref: "Job",
//       }
//   ],
//   applicant: [
//       {
//           type:mongoose.Schema.Types.ObjectId,
//           required: true,
//           ref: "User",
//         // ref:"Application",
//       }
//   ],
//   status: {
//           type:String,
//           enum:['pending',"accepted","rejected"],
//           default:"pending",
//   },
// },{timestamps:true});

// module.exports = mongoose.model("Applications", applicationsSchema);


const mongoose = require("mongoose");

const applicationsSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Job",
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationsSchema);

