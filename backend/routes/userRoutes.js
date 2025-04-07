// const express = require("express"); 
// const router = express.Router();
// const {singleUpload} = require("../middleware/multer")
// const {register, login,logout,profileUpdate} = require("../controllers/user");
// const {auth} = require ("../middleware/auth")
// const multer = require("multer");

// router.post("/register",register);
// router.post("/login",login);
// router.get("/logout",logout);
// // router.post("/profileUpdate",auth,singleUpload,profileUpdate);
// router.post("/profileUpdate",auth,profileUpdate);


// // Link to company routes (you can uncomment this once the routes are set up)
// const jobRoutes = require("./jobRoutes");
// router.use("/job", jobRoutes);

// //link to application routes
// const applicationRoutes = require("./applicationRoutes");
// router.use("/application", applicationRoutes);

// module.exports = router;

const express = require("express"); 
const router = express.Router();
// const { upload } = require("../middleware/multer"); // Import Multer middleware
const { register, login, logout, profileUpdate } = require("../controllers/user");
const { auth } = require("../middleware/auth");

// router.post("/register", register);  // Apply multer to handle file upload
// router.post("/login", login);
// router.get("/logout", logout);
// router.post("/profileUpdate", auth, profileUpdate); // Apply multer for profile update

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(auth,profileUpdate);


// Link to company routes
const jobRoutes = require("./jobRoutes");
router.use("/job", jobRoutes);

// Link to application routes
const applicationRoutes = require("./applicationRoutes");
router.use("/application", applicationRoutes);

module.exports = router;
