var fs = require('fs')
var OAuth = require('wechat-oauth')
class Wechat {
  constructor(appId, appSecret) {
    this.appId = appId
    this.appSecret = appSecret
    this.client = new OAuth(this.appId, this.appSecret)
  }
  //  //从缓存中获取用户的assets token
  getToken (openId, callback) {
    let file = `runtime/access_token_${openId}.txt`;//这个目录应该是放置授权文件的路径
    if (fs.existsSync(file)) {
      return callback(null)
    }
    fs.readFile(file, 'utf8', function (err, txt) {
      if (err) {
        console.log("get token fail");
        return callback(err)
      }
      callback(null, JSON.parse(txt))
    })
  }
  // 入宫获取到token则把token设置到缓存中
  setToken (openId, token, callback) {
    let file = `runtime/access_token_${openId}.txt`
    fs.writeFile(file, JSON.stringify(token), callback)
  }
  //传入url让用户点击授权
  getAuthorizeURL (url) {
    let redirectUrl = this.client.getAuthorizeURL(url, 'qiongtao.li', 'snsapi_userinfo')
    return redirectUrl
  }
  // 获取用户的accessToken
  async getAccessToken () {
    return new Promise((resolve, reject) => {
      this.client.getAccessToken(code, (err, result) => {
        if (err) {
          console.log('[wechat] get access token err', err)
          resolve()
        }
        console.log('[wechat] access token:', rst.data);
        resolve(result.data)
      })
    })
  }
  // 通过openid获取到用户信息

  async getUser (openid) {
    return new Promise((resolve, reject) => {
      this.client.getUser(openid, (err, rst) => {
        if (err) {
          console.log('[wechat] get user info err', err);
          resolve();
        }
        console.log('[wechat] userinfo:', rst);
        resolve(rst);
      })
    })
  }
}

module.exports = Wechat