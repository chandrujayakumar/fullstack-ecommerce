const app = require("./app")
const dotenv = require("dotenv")


//.env config

dotenv.config({
    path: "./config/config.env"
})



//running the server

const server = app.listen(process.env.PORT, () => {
    console.log(`+ Server is running at http://localhost:${process.env.PORT}/`)
})