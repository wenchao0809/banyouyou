import { HOST, TOKEN } from '../config/index.js'
// import HeaderConfig from './header_config.js'

class Token {
  constructor () {
    this.verifyUrl = HOST + 'token/verify'
    this.tokenUrl = HOST + 'token'
  }

  verify (callBack) {
    var token = wx.getStorageSync(TOKEN)
    if (!token) {
      this.getTokenFromServer(callBack)
    } else {
      // 看具体需求，没有校验token接口，下一次请求token失效后，也会自动刷新token
      this._veirfyFromServer(token, callBack)
    }
  }

  async _veirfyFromServer (token, callBack) {
    let that = this
    // let config = await HeaderConfig()
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      header: config
    }).then(res => {
      let valid = res.data.isValid
      if (!valid) {
        that.getTokenFromServer(callBack)
      } else {
        callBack && callBack(null)
      }
    })
  }

  async getTokenFromServer (callBack) {
    let that = this
    // let config = await HeaderConfig()
    wx.login().then(res => {
      wx.request({
        url: that.tokenUrl,
        method: 'POST',
        data: {
          code: res.code
        },
        header: config
      }).then(res => {
        const data = res.data.data
        if (data && data.token) {
          try {
            wx.setStorageSync(TOKEN, data.token)
            callBack && callBack(data.token)
          } catch (e) {
            console.log(`[设置登录态失败]，${JSON.stringify(e)}`)
          }
        } else {
          wx.showToast({
            title: res.data.message || '获取token错误',
            duration: 3000
          })
        }
      })
    })
  }
}

module.exports = Token
