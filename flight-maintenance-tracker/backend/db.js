const mysql = require('mysql2/promise');
require('dotenv').config({ path: __dirname + '/.env' });

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'flight_tracker',
});

module.exports = pool;
