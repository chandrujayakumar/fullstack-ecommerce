const app = require("./app")
const dotenv = require("dotenv")
const { db_connection } = require("./config/database")


//.env config

dotenv.config({
    path: "./config/config.env"
})

//checking database connection status

db_connection()

//running the server

const server = app.listen(process.env.PORT, () => {
    console.log(`+ Server is running at http://localhost:${process.env.PORT}/`)
})