// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodeImages: [
      {
        name: 'BUU-8号客服微信：BUU-120801',
        url: 'https://housestore.oss-cn-hangzhou.aliyuncs.com/2020-04-27/9135f37e-fa77-4adb-85da-1a0ff6b2288c.jpeg'
      },
      {
        name: 'BUU-6号客服微信：STR1066053831',
        url:  'https://housestore.oss-cn-hangzhou.aliyuncs.com/2020-04-27/9135f37e-fa77-4adb-85da-1a0ff6b2288c.jpeg'
      }
    ]
  },

  getSetting () {
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
  },
  previewImage ({ currentTarget: { dataset: { url: url } } }) {
    let urls = this.data.qrcodeImages.map(item => item.url)
    wx.previewImage({
      current: url,
      urls
    })
  },
  clearStorage () {
    try {
      wx.clearStorageSync()
    } catch (e) {
      // Do something when catch error
    }
  },
  logout() {
    wx.removeStorageSync('token')
    wx.navigateTo({ url: '/pages/login/login' })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})