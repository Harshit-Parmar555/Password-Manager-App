const express = require("express");
const { getalluser, userregister, userlogin } = require("../controllers/usercontroller");


const router = express.Router();



router.post("/userregister",userregister);

router.post("/userlogin",userlogin);



module.exports = router