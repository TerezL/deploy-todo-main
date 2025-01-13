const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
        user: "postgres",
        host: process.env.HOST,
        database: "todoapp",
        password: "postgres",
        port: process.env.DBPORT,
})

module.exports = pool