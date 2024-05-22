const express = require("express")
const router = express.Router()
const { addToCart, removeFromCart, getCartItems, deleteItemFromCart } = require("../controllers/cartController")
const { isAuthenticated, authorizeRoles } = require("../middleware/auth")

router.route("/additem").post(isAuthenticated, addToCart)

router.route("/removeitem").post(isAuthenticated, removeFromCart)

router.route("/getitems").get(isAuthenticated, getCartItems)

router.route("/delete").delete(isAuthenticated, deleteItemFromCart)

module.exports = router