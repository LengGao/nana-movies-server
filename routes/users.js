var express = require('express');
var router = express.Router();
var url = require('url')
var querystring = require('querystring')
var util = require('util')
var pool = require('../dao/baseConeect')

// 找摄影
router.get('/findPhotoList', function (req, rep) {
  let param = req.query
  let offset = 0
  let pageSize = 10
  if (param.offset) {
    offset = param.offset
    pageSize = param.pageSize
  }
  var resourceType_sql = `SELECT tb_author.authorHeader as authorHeader,tb_author.authorFrom as authorFrom,tb_author.authorNickName as authorNickName , tb_works.worksName,tb_works.category,tb_works.worksCover,tb_works.worksLink From tb_resource_relationship,tb_author,tb_works where tb_resource_relationship.authorId = tb_author.authorId and tb_resource_relationship.worksId = tb_works.worksId and tb_resource_relationship.resourceType='02' limit ${offset},${pageSize}`;
  pool.getConnection((err, connection) => {
    connection.beginTransaction();
    connection.query(resourceType_sql, (err, res) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        connection.rollback()
        connection.release()
      } else {
        rep.status(200)
        // rep.writeHead(200)
        // JSON.parse
        console.log("data", res, typeof res);
        connection.commit()
        rep.send(res)
        connection.release()
      }
    })
  })
})

// 找电影
router.get('/findMovieList', function (req, rep) {
  let param = req.query
  let offset = 0
  let pageSize = 10
  if (param.offset) {
    offset = param.offset
    pageSize = param.pageSize
  }
  var resourceType_sql = `SELECT tb_author.authorHeader as authorHeader,tb_author.authorFrom as authorFrom,tb_author.authorNickName as authorNickName , tb_works.worksName,tb_works.category,tb_works.worksCover,tb_works.worksLink From tb_resource_relationship,tb_author,tb_works where tb_resource_relationship.authorId = tb_author.authorId and tb_resource_relationship.worksId = tb_works.worksId and tb_resource_relationship.resourceType='01' limit ${offset},${pageSize}`;
  pool.getConnection((err, connection) => {
    connection.beginTransaction();
    connection.query(resourceType_sql, (err, res) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        connection.rollback()
        connection.release()
      } else {
        rep.send(res)
        connection.commit()
        connection.release()
      }
    })
  })
})



module.exports = router;