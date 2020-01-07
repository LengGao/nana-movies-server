var mysql = require('mysql');
var pool = mysql.createPool({
  host: '183.63.80.66',
  port: '2238',
  user: 'root',
  password: '3wzKsf5U',
  database: 'db_nana_movie',
  dateString: true,
  multipleStatements: true,
  charset: 'UTF8',
  connectTimeout: 5000,
  stringifyObjects: true,
  connectionLimit: 20,
})

module.exports = pool;