const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
        console.log("Cloudinary connected");
    } catch (error) {
        console.log(error)
    }
}