require('dotenv').config({ path: '.env' });

const {createPool} = require('mysql');

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSSWORD,
  connectionLimit: 10,
  database: process.env.DB_NAME
})

module.exports = pool;