// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const { cloudinary } = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "upload_logo",
//     format: async (req, file) => "png", // Convert everything to PNG
//     public_id: (req, file) => file.originalname.split(".")[0],
//   },
// });

// const upload = multer({ storage }).single("profilePhoto"); // Field name should match frontend

// module.exports = { upload };
