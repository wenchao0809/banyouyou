// pages/my-orders/my-orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBar: [
      {
        num: 0,
        text: '待付款'
      },
      {
        num: 0,
        text: '待发货'
      },
      {
        num: 0,
        text: '待收获'
      },
      {
        num: 0,
        text: '退款 / 售后'
      }
    ],
    adImg: 'http://chuantu.xyz/t6/703/1573008573x992245926.png'
  },

  goShop () {
    wx.switchTab({
      url: '/pages/home/home'
    })
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