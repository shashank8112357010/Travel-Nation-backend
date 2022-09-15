const mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
	// port: process.env.DB_PORT,
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

// var connection  = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: '',
// 	database: 'travelnation',
// 	port: 3306,

// })

connection.connect((err) => {
	if(!err) {
		console.log('Connected successfully with database');
	} else {
		console.log(err);
	}
});

module.exports = connection;