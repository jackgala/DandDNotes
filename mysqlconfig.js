
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  database: 'DandDNotes',
  password: process.env.MYSQL_PASSWORD
});

module.exports = connection;