// pages/set/set.js
import { distributeOverview } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    overview: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    distributeOverview()
      .then(res => {
        res.total = (res.total / 1000).toFixed(2)
        res.getMoney = (res.getMoney / 1000).toFixed(2)
        res.willGet = (res.getMoney / 1000).toFixed(2)
        this.setData({ overview: res })
      })
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