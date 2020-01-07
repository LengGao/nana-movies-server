var connection = require('./baseConeect')

/**
 * 摄影作品
 * @param {*} currentPage 
 * @param {*} pageSize 
 */

function findPhotoList (callback, currentPage = 1, pageSize = 10) {
  var offset = (parseInt(currentPage) - 1) * parseInt(pageSize)

  // var resourceType_sql = `SELECT tb_author.authorHeader as authorHeader,tb_author.authorFrom as authorFrom,tb_author.authorNickName as authorNickName , tb_works.worksName,tb_works.category,tb_works.worksCover,tb_works.worksLink From tb_resource_relationship,tb_author,tb_works where resourceType = 02 amd tb_resource_relationship.authorId = tb_author.authorId and tb_resource_relationship.worksId = tb_works.worksId limit ${offset} ,${pageSize}`
  var resourceType_sql = `SELECT * from tb_works limit ${offset}, ${pageSize}`
  var x = {}
  connection.query(resourceType_sql, (err, res) => {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      connection.end();
      return
    } else {
      // console.log('--------------------------SELECT----------------------------');
      // console.log(fields);
      // console.log('------------------------------------------------------------\n\n');
      if (callback) callback(err, res)
    }
  })
}

/**
 * 影视作品作品
 * @param {*} currentPage 
 * @param {*} pageSize 
 */
function findMovieList (currentPage, pageSize = 10) {
  var data = ''
  var offset = (parseInt(currentPage) - 1) * parseInt(pageSize)
  // var resourceType_sql = `SELECT tb_author.authorHeader as authorHeader,tb_author.authorFrom as authorFrom,tb_author.authorNickName as authorNickName , tb_works.worksName,tb_works.category,tb_works.worksCover,tb_works.worksLink From tb_resource_relationship,tb_author,tb_works where resourceType = 02 amd tb_resource_relationship.authorId = tb_author.authorId and tb_resource_relationship.worksId = tb_works.worksId limit ${offset} ,${pageSize}`
  var resourceType_sql = `SELECT * from tb_works limit ${offset} ,${pageSize}`
  connection.query(resourceType_sql, (err, res) => {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
    } else {
      console.log('--------------------------SELECT----------------------------');
      console.log(res);
      console.log('------------------------------------------------------------\n\n');
    }
  })
  connection.end();
}

/**
 * 获取带你应详情
 * @param {*} url 
 * @param {id:id} data 
 */
function findWorksDetail (url, params) {
  var data = ''
  if (!params.id) return data + '没得id'
  var sql = `SELECT * FROM tb_works where id = ${params.id}`
  connection.query(resourceType_sql, (err, res) => {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return
    } else {
      console.log('--------------------------SELECT----------------------------');
      console.log(res);
      console.log('------------------------------------------------------------\n\n');
      data = res;
    }
  })
  connection.end();
  return data
}

/**
 * 保存用户信息
 * @param {*} url 
 * @param {*} data 用户信息对象
 */
function saveUserInfo (url, data) {

}

let dao = {
  // findSwiperList,
  // findNoticeB1arText,
  // findPopularitysList,
  // findNewProductsList,
  // findNoticesList,
  findPhotoList,
  findMovieList,
  findWorksDetail,
  saveUserInfo
}
module.exports = dao