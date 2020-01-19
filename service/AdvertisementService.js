var AdvertisementDao = require('../dao/AdvertisementDao')
var ResponseBean = require('./Response')

class AdvertisementService {
  constructor() { }

  // 首页录播图片显示
  getAdvertisement (callback) {
    var advertisementDao = new AdvertisementDao()
    advertisementDao.getAdvertisement().then(res => {
      let body = new Array();
      let obj = new Object();
      res.forEach(element => {
        obj = {
          id: element.advertisementId,
          coverLink: element.advertisementCover
        }
        body.push(obj)
      });
      let data = new ResponseBean({ body: body, meassage: "helo" })
      callback(data)
    }).catch(err => {
      console.log("getAdvertisement err" + err);
    })
  }


}
module.exports = AdvertisementService
