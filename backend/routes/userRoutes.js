const express = require("express")
const router = express.Router()
const { sendOTP, loginsignup, logout, updateUser, getuserdetails, signupNewUser } = require("../controllers/userControllers")
const { isAuthenticated } = require("../middleware/auth") 

//send otp to user email
router.route("/sendotp").post(sendOTP)

//login/signup
router.route("/loginsignup").post(loginsignup)

//get fullname for new user for signup
router.route("/signupuser").post(signupNewUser)

//logout
router.route("/logout").post(isAuthenticated, logout)

//dashboard (get user details)
router.route("/dashboard").get(isAuthenticated, getuserdetails)

//update the user information
router.route("/update").post(isAuthenticated, updateUser)

module.exports = router