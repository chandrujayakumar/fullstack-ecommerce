const express = require("express")
const router = express.Router()
const { sellerApplication, sellerLogin, sellerLogout, addProduct, getSellerDetails, deleteProduct, updateProductDetails } = require("../controllers/sellerController")
const { isSellerAuthenticated } = require("../middleware/auth")
const uploadImage = require("../middleware/imageUpload")

//seller application
router.route("/apply").post(sellerApplication)

//seller login
router.route("/login").post(sellerLogin)

//seller logout
router.route("/logout").post(isSellerAuthenticated, sellerLogout)

//seller dashboard
router.route("/dashboard").get(isSellerAuthenticated, getSellerDetails)

//add product
router.route("/addproduct").post(isSellerAuthenticated, uploadImage, addProduct)

//delete product
router.route("/deleteproduct").delete(isSellerAuthenticated, deleteProduct)

//update product details
router.route("/updateproduct").put(isSellerAuthenticated, uploadImage, updateProductDetails)

module.exports = router 