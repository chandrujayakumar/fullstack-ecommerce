const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")

//.env config

dotenv.config({
    path : "./config/config.env"
})

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())

// add the routes here below

app.get("/", (req, res) => { //this is just test routes
    res.send("This is working")
})


module.exports = app