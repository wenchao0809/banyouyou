// pages/address/address.js
import { getUserAddress } from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {
      limit: 20,
      offset: 0
    },
    addressList: []
  },

  goAddaddress () {
    wx.navigateTo({
      url: '/pages/add-address/add-address'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getUserAddress(this.data.query)
    .then(res => this.setData({ addressList: res }))
  },
  onShow() {
    console.log('show address page')
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