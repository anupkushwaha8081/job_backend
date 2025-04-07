const express = require("express"); 
const router = express.Router();

const {registerCompany,getCompany,getCompanyId,updateCompany} = require("../controllers/company");
const {auth} = require ("../middleware/auth")

router.post("/registerCompanny",auth,registerCompany);
router.get("/getCompany",auth,getCompany);
router.get("/getCompany/:id",auth,getCompanyId);
router.put("/updateCompany/:id",auth,updateCompany);

module.exports = router;