const express = require("express"); 
const router = express.Router();

const {applyJob,getAppliedJobs,getApplicants,updateStatus } = require("../controllers/applications");
const {auth} = require ("../middleware/auth")

router.post("/applyJob/:id",auth,applyJob);
router.get("/getAppliedJobs",auth,getAppliedJobs);
router.get("/:id/applicants",auth,getApplicants);
router.put("/status/:id/update",auth,updateStatus);


module.exports = router;