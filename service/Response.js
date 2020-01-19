class ResponseBean {
  body = {} //相应数据主体
  total = 0 //数据条数
  status = 200
  meassage = "成功"

  constructor(option) {
    this.body = option.body || this.body
    this.total = option.total || this.totalz
    this.status = option.status || this.status
    this.meassage = option.meassage ? option.meassage : this.status == 200 ? "成功" : "失败"
  }

  toString () {
    return `body: ${body},total: ${total},status: ${status},meassage: ${meassage}`
  }
}
module.exports = ResponseBean