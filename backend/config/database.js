const mysql = require("mysql2")

const pool = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DATABASE
}).promise()

const db_connection = () => {
    pool.getConnection((err, connection) => {
        if(err){
            console.error("- Database connection failed\n", err)
            process.exit(1)
        }else{
            console.log("+ Connected to Database")
            connection.release()
        }
    })
}


module.exports = { pool, db_connection }