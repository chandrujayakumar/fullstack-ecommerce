const express = require("express")
const router = express.Router()
const { sendOTP, loginsignup, logout, updateUser, getuserdetails, signupNewUser } = require("../controllers/userControllers")
const { isAuthenticated } = require("../middleware/auth")
const { validateEmail, validateUserLogin, validateUserSignup, validateAll } = require("../middleware/validation") 

//send otp to user email
router.route("/sendotp").post(validateEmail, sendOTP)

//login/signup
router.route("/loginsignup").post(validateUserLogin, loginsignup)

//get fullname for new user for signup
router.route("/signupuser").post(validateUserSignup, signupNewUser)

//logout
router.route("/logout").post(isAuthenticated, logout)

//dashboard (get user details)
router.route("/dashboard").get(isAuthenticated, getuserdetails)

//update the user information
router.route("/update").post(isAuthenticated, updateUser)

module.exports = router