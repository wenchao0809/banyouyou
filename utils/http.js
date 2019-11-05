import HeaderConfig from './header_config.js'
import { HOST, TOKEN } from '../config/index.js'
import Token from '../models/token'

class HTTP {
  _request (url, option = {}, fn = 'request') {
    let that = this
    return new Promise(async function (resolve, reject) {
      let config = await HeaderConfig()
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
  }

  getToken () {
    let token = ''
    try {
      token = wx.getStorageSync(TOKEN)
    } catch (e) {
      console.log(`[HTTP获取登录态失败]，${JSON.stringify(e)}`)
    }
    return token
  }

  statusCOdeHandle (res, resolve, reject, option) {
    let that = this
    let Code = res.data.code.toString()
    if (Code.startsWith('2')) {
      resolve(res.data.data)
    } else if (Code === '403') {
      // token过期，刷新token且重发请求
      that._refetch(option)
    } else {
      reject(res)
      that._show_error(Code)
    }
  }

  _refetch (option) {
    let token = new Token()
    token.getTokenFromServer((token) => {
      this._request(...option)
    })
  }

  _show_error (error_code) {
    let tip = this.errorTips(error_code)
    wx.showToast({
      title: tip,
      icon: 'none',
      mask: true,
      duration: 2000
    })
  }

  errorTips (error_code) {
    switch (error_code) {
      case 1000:
        break
      default:
        return '网络异常，请重试'
    }
  }
}

module.exports = HTTP
