const express = require("express")
const router = express.Router()
const { getallusers, changeAdminRole, deleteUser, addNewAdmin, getalladmins, adminLogin, deleteAdmin, logout, getAdminDetails } = require("../controllers/adminController")
const { isAdminAuthenticated, authorizeRoles } = require("../middleware/auth")

//admin login
router.route("/login").post(adminLogin)

//admin logout
router.route("/logout").post(isAdminAuthenticated, logout)

//admin dashboard
router.route("/dashboard").get(isAdminAuthenticated, getAdminDetails)

//get all users
router.route("/getallusers").get(isAdminAuthenticated, authorizeRoles("admin"), getallusers)

//get all admins
router.route("/getalladmins").get(isAdminAuthenticated, authorizeRoles("admin"), getalladmins)

//change admin role
router.route("/changeadminrole").post(isAdminAuthenticated, authorizeRoles("admin"), changeAdminRole)

//add new admin
router.route("/addadmin").post(isAdminAuthenticated, authorizeRoles("admin"), addNewAdmin)

//delete user
router.route("/deleteadmin").delete(isAdminAuthenticated, authorizeRoles("admin"), deleteAdmin)

//delete admin
router.route("/deleteuser").delete(isAdminAuthenticated, authorizeRoles("admin"), deleteUser)

module.exports = router