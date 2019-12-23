// import HeaderConfig from './header_config.js'
import { HOST, TOKEN } from '../config/index.js'
import Token from '../models/token'

const HTTP = {
  _request (url, option = {}, fn = 'request') {
    let that = this
    option.method = option.method || 'POST'
    // option.method = 'Post'
    return new Promise(async function (resolve, reject) {
      // let config = await HeaderConfig()
      let config = {}
      wx[fn]({
        ...option,
        url: HOST + url,
        header: {
          'content-type': 'application/json',
          token: that.getToken(),
          ...config
        }
      }).then(res => {
        that.statusCOdeHandle(res, resolve, reject, { url, option, fn })
      }).catch(e => {
        reject(e)
        that._show_error(1)
      })
    })
  },

  getToken () {
    let token = ''
    try {
      token = wx.getStorageSync(TOKEN)
    } catch (e) {
      console.log(`[HTTP获取登录态失败]，${JSON.stringify(e)}`)
    }
    return token
  },

  statusCOdeHandle (res, resolve, reject, option) {
    let that = this
    let Code = res.data.code
    if (Code === 0) {
      resolve(res.data)
    } else if (Code === 10001) {
      // token过期，刷新token且重发请求
      that._refetch(option)
    } else {
      reject(res.data)
      that._show_error(res.data.msg)
    }
  },

  _refetch (option) {
    let token = new Token()
    token.getTokenFromServer((token) => {
      this._request(...option)
    })
  },

  _show_error (msg) {
    // let tip = this.errorTips(error_code)
    wx.showToast({
      title: msg,
      icon: 'none',
      mask: true,
      duration: 2000
    })
  },

  errorTips (error_code) {
    switch (error_code) {
      case 1000:
        break
      default:
        return '网络异常，请重试'
    }
  },
}

module.exports = HTTP
