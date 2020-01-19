
var Executor = require('./BaseDao');


class AdvertisementDao {
  constructor() { }

  // 获取首页轮播图
  getAdvertisement () {
    let sql = 'SELECT * FROM tb_advertisement limit 0,3'
    let exe = new Executor()
    return exe.commonExec(sql)
  }
}

module.exports = AdvertisementDao