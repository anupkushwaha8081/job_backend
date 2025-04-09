const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");

// Load environment variables
dotenv.config();

// Use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Setup file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    // createParentPath: true,
  })
);

// Setup CORS with .env variable
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Example: http://localhost:5173
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

// Connect to database
const db = require("./config/database");
db.connect();

// Connect to Cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/v1", userRoutes);

const companyRoutes = require("./routes/companyRoutes");
app.use("/api/v1/company", companyRoutes);

// Optional: Serve frontend in production
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "frontend/dist")));
// app.get("*", (_, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

// Health check route (optional for testing backend)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
