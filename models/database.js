const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306, // ✅ port MySQL par défaut
  waitForConnections: true,
  connectionLimit: 10, // ✅ 10 connexions c’est déjà bien
  queueLimit: 0
});

module.exports = pool;
