 require('dotenv').config()
let mysql = require('mysql')

let conexion = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password:process.env.PASSWORD
})

conexion.connect(function(err){
  if(err){
    throw err.stack
  }else{
    console.log('base conectada')
  }
})

conexion.end();