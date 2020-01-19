var mysql = require('mysql');
var async = require('async');
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

class Executor {
  constructor() { }

  // 常规执行
  commonExec (sql, param, callback) {
    if (!sql) return console.log("no sql !")
    return new Promise((resolve, reject) => {
      pool.getConnection((fail, conn) => {
        if (fail) return reject("get Connect fail")
        conn.beginTransaction((error) => {
          if (error) return reject("begin transaction fail")
          conn.query(sql, param ? param : '', (err, res) => {
            if (err) {
              conn.rollback()
              if (callback) callback()
              reject(err)
            } else {
              conn.commit()
              if (callback) callback()
              console.log('sql：' + sql + " ,param：" + param + " ,res：" + JSON.stringify(res))
              resolve(res)
            }
            return conn.release()
          })
        })
      })
    })
  }

  /**
   * 串行执行
   * sqlparamsEntities sql数组 [{sql:语句,params:参数}]
   */
  seriesExec (sqlparamsEntities) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject("get Connect fail");
        connection.beginTransaction((err) => {
          if (err) return reject("begin transaction fail");
          console.log("开始执行transaction，共执行" + sqlparamsEntities.length + "条数据");
          var funcAry = [];
          sqlparamsEntities.forEach((sql_param) => {
            var temp = function () {
              var sql = sql_param.sql;
              var param = sql_param.params;
              connection.query(sql, param, (tErr, rows, fields) => {
                if (tErr) {
                  connection.rollback()
                  return reject("事务失败，" + sql_param + "，ERROR：" + tErr);
                }
              })
            };
            funcAry.push(temp);
          });
          async.series(funcAry, (err, result) => {
            if (err) {
              connection.rollback()
              connection.release()
              return reject("transaction error" + err)
            } else {
              connection.commit((err, info) => {
                console.log("transaction info: " + JSON.stringify(info));
                if (err) {
                  connection.rollback();
                  connection.release();
                  return reject("执行事务失败，" + err)
                } else {
                  connection.release();
                  return resolve(info);
                }
              })
            }
          })
        });
      });
    })
  }

  // cllass end
}


module.exports = Executor;