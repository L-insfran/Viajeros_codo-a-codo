
require('dotenv').config();
const mysql = require('mysql2/promise');

const conexion = mysql.createPool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD
});

module.exports = conexion;

