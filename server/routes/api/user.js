const express = require("express");
const router = express.Router();
const userController= require('../../controllers/userContoller')
const { authenticate } = require("../../utils/authentication");



router.post("/register", userController.register);
router.post("/login", userController.login)


module.exports = router;