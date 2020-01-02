var connection = require('./main')


/**
 * 轮播图查询
 * @param {*} currentPage 
 * @param {*} pageSize 
 */
export function findSwiperList (currentPage, pageSize) {
  var offset = (parseInt(currentPage) - 1) * parseInt(pageSize)
  var sql = `SELECT * FROM tb_advertisement limit ' + ${offset} + ',${pageSize}`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    } else {
      console.log('--------------------------SELECT----------------------------');
      console.log(result);
      console.log('------------------------------------------------------------\n\n');
      return result;
    }
  });
  connection.end();
}

/**
 *  系统通知消息
 * @param {*} number 第几条通知
 */
export function findNoticeB1arText (id) {
  var sql = `SELECT * FROM tb_notice where noticeId= ${id}`
  connection.query(sql, (err, res) => {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
    } else {
      console.log('--------------------------SELECT----------------------------');
      console.log(res);
      console.log('------------------------------------------------------------\n\n');
      return res
    }
  })
  connection.end()
}

export function findNoticeB1arText (currentPage, pageSize) {
  var offset = (parseInt(currentPage) - 1) * parseInt(pageSize)
  var resourceType_sql = 'SELECT * From tb_resource_relationship where resourceType = 01'
  var result = connection.query(resourceType_sql, (err, res) => {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return
    } else {
      console.log('--------------------------SELECT----------------------------');
      console.log(result);
      console.log('------------------------------------------------------------\n\n');
      return result;
    }
  })
  var author_sql = `SELECT authorName,authorHeader,authorFrom,authorNickName,anthorCountry,authorProvince,authorCity where authorStatus = 1, authorId = ?`
  var resArray = result.map((item, index) => {

  })

  var sql = `SELECT * FROM tb_advertisement limit ' + ${offset} + ',${pageSize}`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    } else {
      console.log('--------------------------SELECT----------------------------');
      console.log(result);
      console.log('------------------------------------------------------------\n\n');
      return result;
    }
  });
  connection.end();
}