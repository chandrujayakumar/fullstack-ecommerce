const express = require("express")
const router = express.Router()
const { sellerApplication, sellerLogin, sellerLogout, addProduct, getSellerDetails, deleteProduct, updateProductDetails, getProducts, getProductDetails } = require("../controllers/sellerController")
const { isSellerAuthenticated } = require("../middleware/auth")
const uploadImage = require("../middleware/imageUpload")
const { validateEmail, validateLogin, validateSellerApplication, validateAll } = require("../middleware/validation")


//seller application
router.route("/apply").post(validateSellerApplication,sellerApplication)

//seller login
router.route("/login").post(validateLogin, sellerLogin)

//seller logout
router.route("/logout").post(isSellerAuthenticated, sellerLogout)

//seller dashboard
router.route("/dashboard").get(isSellerAuthenticated, getSellerDetails)

//add product
router.route("/addproduct").post(isSellerAuthenticated, uploadImage, addProduct)

//delete product
router.route("/deleteproduct/:public_id").delete(isSellerAuthenticated, deleteProduct)

//update product details
router.route("/updateproduct").put(isSellerAuthenticated, uploadImage, updateProductDetails)

//get all products
router.route("/getproducts").get(isSellerAuthenticated, getProducts)

//get product details
router.route("/getproductdetails").get(isSellerAuthenticated, getProductDetails)

module.exports = router 