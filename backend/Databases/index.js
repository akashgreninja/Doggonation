var mysql = require('mysql');
require('dotenv').config({path:'../.env'})

// MySQL username:  GreninjaCorp

// MySQL user password:greninja1234

var connection = mysql.createPool({
    connectionLimit: 1000,
    host: "db4free.net",
    port: '3306',
    user: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,
    insecureAuth: true
  });
  
  module.exports = connection