const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware")

//.env config

dotenv.config({
    path : "./config/config.env"
})

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())
app.use(cookieParser())


//backend routes 

const admin = require("./routes/adminRoutes")
const user = require("./routes/userRoutes")
const cart = require("./routes/cartRoutes")

app.use("/api/v1/admin", admin)
app.use("/api/v1/user", user)
app.use("/api/v1/user/cart", cart)


//middleware for errors

app.use(errorHandlingMiddleware)

module.exports = app