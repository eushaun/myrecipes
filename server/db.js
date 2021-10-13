const { Client } = require('pg');
const dbconfig = require('./config'); //Database connection config

//Connect to the Amazon RDS instance
const connection = new Client({
  host: dbconfig.db['host'],
  user: dbconfig.db['username'],
  password: dbconfig.db['password'],
  port: dbconfig.db['port'],
  database: dbconfig.db['database']
});

connection.connect((err) => {
  if (err) {
    console.error(err.stack);
    return;
  }
});

module.exports = connection;
