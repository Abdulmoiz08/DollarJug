const express = require('express');
const router = express.Router();
const upload = require("../config/multerconfig")
const {registerUser,loginUser, getUsers} = require('../controller/authController');
const {protect} = require('../middleware/authmiddleware');
const {admin} = require('../middleware/adminmiddleware');


router.post("/register",upload.single("image"),registerUser);
router.post("/login",loginUser);
router.get("/users",protect,admin,getUsers);


module.exports = router;