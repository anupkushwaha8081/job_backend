const DataUriParser = require("datauri/parser");
const path = require("path");

const getDataUri = (file) => {
// Pehle check karo ki file sahi hai ya nahi
if (!file ) {
  throw new Error("File is missing or invalid.");
}

const parser = new DataUriParser();
const extName = path.extname(file.originalname).toString();
return parser.format(extName, file.buffer);
};

module.exports = getDataUri;
