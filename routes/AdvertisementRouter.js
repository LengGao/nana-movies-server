var express = require('express');
var router = express.Router();
var Service = require('../service/AdvertisementService')

router.get('/getHomeImage', (req, rep) => {
  var service = new Service()
  service.getAdvertisement((data) => {
    rep.send(data)
    rep.end()
  })
})

module.exports = router;