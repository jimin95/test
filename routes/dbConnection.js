var mysql = require('mysql');

var dbConfig = {
   host: 'localhost',
   //host: '192.168.1.129',
   user: 'root',
   password: 'jimin123!!',
   //password: '!zkeoxla!',
   port: 3306,
   database: 'medical'
};

var pool = mysql.createPool(dbConfig);

module.exports = pool;