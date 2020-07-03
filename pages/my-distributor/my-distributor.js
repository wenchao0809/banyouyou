// pages/set/set.js
import { distributeOverview, getUserInfo, registerDistributor } from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    overview: {}
  },
  apply() {
    registerDistributor()
      .then(res => {
        this.setData({ status: 1 })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let userInfo = await getUserInfo()
    let status = userInfo.IsDistribution
    if (status === 3) {
      distributeOverview()
        .then(res => {
          res.total = (res.total / 100).toFixed(2)
          res.getMoney = (res.getMoney / 100).toFixed(2)
          res.willGet = (res.willGet / 100).toFixed(2)
          this.setData({ overview: res })
        })
    }
    this.setData({ status })
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