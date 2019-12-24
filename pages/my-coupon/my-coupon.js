// pages/my-coupon/my-coupon.js
import { getCouponList } from '../../api/index.js'

Page({
  limit: 20,
  pageIndex: 1,
  type: 1,

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    couponList: []
  },

  tabContent(e) {
    let tabIndex = e.target.dataset.item
    this.type = tabIndex + 1
    this.pageIndex = 1
    this.setData({
      tabIndex
    })
    getCouponList({ limit: this.limit, offset: (this.pageIndex - 1) * 20, type: this.type }).then(res => {
      console.log(res)
    })
  },

  changeTabIndex(e) {
    this.setData({
      tabIndex: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getCouponList({ limit: this.limit, offset: (this.pageIndex - 1) * 20, type: this.type }).then(res => {
      console.log(res)
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
    this.pageIndex++
    getCouponList({ limit: this.limit, offset: (this.pageIndex - 1) * 20, type: this.type }).then(res => {
      console.log(res)
    })
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