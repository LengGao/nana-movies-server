var express = require('express');
var router = express.Router();
var url = require('url')
var querystring = require('querystring')
var util = require('util')
var pool = require('../dao/BaseDao')
var bodyParser = require('body-parser')
// create application/json parser   
var jsonParser = bodyParser.json()//获取JSON解析器中间件  
// create application/x-www-form-urlencoded parser   
var urlencodedParser = bodyParser.urlencoded({ extended: false })//url-encoded解析器  
var crypto = require('crypto')
var Service = require('../service/UserService');

//统一设置响应头解决跨域
// router.all('*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*') // 允许访问的域
//   res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
//   next() // 放行
// })

// 找摄影
router.get('/findPhotoList', function (req, rep) {
  let param = req.query
  let offset = 0
  let pageSize = 10
  if (param.offset) {
    offset = param.offset
    pageSize = param.pageSize
  }
  let resourceType_sql = `SELECT SQL_CALC_FOUND_ROWS tb_author.authorHeader as authorHeader,tb_author.authorFrom as authorFrom,tb_author.authorNickName as authorNickName , tb_works.worksName,tb_works.category,tb_works.worksCover,tb_works.worksLink From tb_resource_relationship,tb_author,tb_works where tb_resource_relationship.authorId = tb_author.authorId and tb_resource_relationship.worksId = tb_works.worksId and tb_resource_relationship.resourceType='02' limit ${offset},${pageSize}`;
  let total_sql = `SELECT FOUND_ROWS();`
  pool.getConnection((poolerr, connection) => {
    connection.beginTransaction();
    connection.query(resourceType_sql, total_sql, (err, res) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        rep.status(500)
        connection.rollback()
        rep.send(err.message)
        connection.release()
        rep.send()
      } else {
        rep.status(200)
        let result = {
          total: res.length,
          data: Array.from(res)
        }
        console.log("data", res, typeof res);
        connection.commit()
        rep.send(result)
        rep.end()
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
  let resourceType_sql = `SELECT SQL_CALC_FOUND_ROWS tb_author.authorHeader as authorHeader,tb_author.authorFrom as authorFrom,tb_author.authorNickName as authorNickName , tb_works.worksName,tb_works.category,tb_works.worksCover,tb_works.worksLink From tb_resource_relationship,tb_author,tb_works where tb_resource_relationship.authorId = tb_author.authorId and tb_resource_relationship.worksId = tb_works.worksId and tb_resource_relationship.resourceType='01' limit ${offset},${pageSize}`;
  let total_sql = `SELECT FOUND_ROWS();`
  pool.getConnection((err, connection) => {
    connection.beginTransaction();
    connection.query(resourceType_sql, total_sql, (err, res) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        connection.rollback()
        rep.send(err.message)
        rep.end()
        connection.release()
      } else {
        let result = {
          total: res.length,
          data: Array.from(res)
        }
        connection.commit()
        rep.send(result)
        rep.end()
        connection.release()
      }
    })
  })
})

/**
 * 电影详情 id = worksId
 */
router.post('/findWorksDetail', urlencodedParser, (req, rep) => {
  let param = req.body.worksId
  console.log('param', param);
  if (!param) {
    rep.end("id错误")
  }
  let result = {}
  let sql = `SELECT * FROM tb_works WHERE worksId = ${param}`;
  pool.getConnection((poolerr, connection) => {
    connection.query(sql, (err, res) => {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        rep.status(500)
        result = Object.assign(result, err)
        rep.send(result)
        connection.rollback()
        connection.release()
        rep.end()
      } else {
        rep.status(200)
        result = {
          data: res
        }
        rep.send(result)
        connection.commit()
        rep.end()
        connection.release()
      }
    })
  })
})

/**
 * 保存意见反馈
 */
router.post('/saveFeedback', (req, rep) => {
  // 发送邮件到 2448745034@qq.com
  rep.status(200)
  rep.send(req.params)
})

router.post('/saveUserInfo', urlencodedParser, (req, rep) => {
  let data = req.body
  if (!data) {
    rep.sendStatus(400)
    rep.send({ errMessage: '参数错误' })
    return
  }
  let max_sql = `SELECT authorId FROM tb_author ORDER BY authorId DESC LIMIT 0,1`
  let innsert_sql = `INSERT INTO tb_author (authorId, authorName, authorHeader, authorFrom, authorSex, authorStatus, authorAge, authorPhone, authorNickName, authorProvince, authorCity, anthorCountry) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
  //是否已经存在账号
  pool.getConnection((poolerr, connection) => {
    connection.query(max_sql, (err, res) => {
      if (err) {
        connection.rollback()
        connection.release()
        rep.status(400)
        rep.end()
        return
      }
      console.log(' res', Array.from(res)[0].authorId);
      let new_authorId = Array.from(res)[0].authorId
      new_authorId = Number(new_authorId)
      new_authorId = new_authorId + 1
      let province = data.province ? data.province : ''
      let city = data.city ? data.city : ''
      let authorFrom = province + city
      let pararm = [new_authorId, null, data.avatarUrl, authorFrom, data.gender, 1, null, null, data.nickName, province, city, null]
      connection.query(innsert_sql, pararm, (innsert_err, inneset_res) => {
        console.log("断电");
        if (innsert_err) {
          console.log("innsert_err", innsert_err.message);
          connection.rollback()
          connection.release()
          rep.sendStatus(500)
          rep.end()
          return
        } else {
          let date = new Date().getTime()
          console.log(date);
          var token = crypto.createHash("md5").update(String(date)).digest('base64');
          let authors_sql = `INSERT INTO tb_auths (authorId, identitytype, identifier,credental, ifverified,token)VALUES (?, ?, ?, ?, ?, ?)`
          console.log("断电", token);
          let authors_param = [new_authorId, '微信', new_authorId, token, 1, token]
          connection.query(authors_sql, authors_param, (author_err, author_res) => {
            if (author_err) {
              console.log("author_err", author_err.message);
              connection.rollback()
              connection.release()
              rep.sendStatus(500)
              rep.end()
              return
            } else {
              console.log("断电");
              connection.commit()
              connection.release()
              rep.send({ "result": '操作成功', "token": token });
              rep.end()
            }
          })
        }
      })
    })
  })
})

/**
 * wx_login
 */
router.post('/wxLogin', (req, rep) => {
  rep.status(200)
})



module.exports = router;