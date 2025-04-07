// utils.js
const cloudinary = require("cloudinary").v2;
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    console.log("Temp file path:", file.tempFilePath);

    if (!file.tempFilePath) {
        throw new Error("Temporary file path is missing.");
    }

    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";

    try {
        const response = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log("file uploaded successfully")
        console.log(response.url)
        return response;
        
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}
module.exports = {
    isFileTypeSupported,
    uploadFileToCloudinary,
};
