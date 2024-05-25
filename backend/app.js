const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware")
const path = require("path")

//.env config

dotenv.config({
    path : "./config/config.env"
})

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())
app.use(cookieParser())
// // Serve static files from the 'build' directory
// app.use(express.static(path.join(__dirname, 'build')));

// // Serve index.html for any other route
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

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