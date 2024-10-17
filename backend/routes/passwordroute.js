const express = require("express");
const { createpassword, deletepassword, getpasswords } = require("../controllers/passwordcontroller");

const router = express.Router();

router.post("/createpassword" , createpassword );

router.delete("/deletepassword/:id" , deletepassword);

router.get("/getpasswords/:user" , getpasswords)

module.exports = router