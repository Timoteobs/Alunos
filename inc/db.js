const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'simple_form_db',
    password: 'admserver01'
  });



// const { Client } = require('pg');
// client = new Client({
//     host: '/cloudsql/myproject:zone:mydb',
//     user: 'username',
//     password: 'password',
//     database: 'database_name',
// });

module.exports = connection;