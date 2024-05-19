const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")

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

app.use("/api/v1/admin", admin)
app.use("/api/v1/user", user)

module.exports = app