const express = require("express")
const router = express.Router()
const { addToCart, removeFromCart, getCartItems } = require("../controllers/cartController")
const { isAuthenticated, cartAuth, authorizeRoles } = require("../middleware/auth")

router.route("/addtocart").post(cartAuth, addToCart)

router.route("/removefromcart").post(cartAuth, removeFromCart)

router.route("/getcartitems").get(isAuthenticated, getCartItems)

module.exports = router