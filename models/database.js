const mysql2 = require('mysql2/promise')

let pool = mysql2.createPool({
    connectionLimit: 10000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:  process.env.DB_PASS,
    database:  process.env.DB_NAME,
    port:3001
});

module.exports = pool