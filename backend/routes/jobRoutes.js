const express = require("express"); 
const router = express.Router();

const {getAdminJobs,getJobById,getJobs,getAllJobs,postJobs, } = require("../controllers/job");
const {auth} = require ("../middleware/auth")

router.post("/postJobs",auth,postJobs);
router.get("/getJobs",auth,getAllJobs);
router.get("/getjobbyuserid",auth,getJobs);
router.get("/getJobsId/:id",auth,getJobById);
router.get("/adminJobs/:id",auth,getAdminJobs);

module.exports = router;