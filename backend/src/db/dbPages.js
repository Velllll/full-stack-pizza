const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER_PAGES,
    password: process.env.DB_PASSWORD_PAGES,
    database: process.env.DB_NAME_PAGES,
}).promise()

connection.connect()
.then(() => console.log("CONECTED TO DATABASE"))
.catch((err)=> console.log(err.message))

module.exports = connection