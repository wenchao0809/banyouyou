// pages/my-orders/my-orders.js
import { orderList } from '../../api/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBar: [
      {
        num: 0,
        text: '全部'
      },
      {
        num: 0,
        text: '待确认'
      },
      {
        num: 0,
        text: '已确认发货'
      },
      {
        num: 0,
        text: '已收货'
      },
      {
        num: 0,
        text: '已完成'
      }
    ],
    orderList: [],
    curActiveTabIndex: 0,
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
  getOrderList() {
    let type = this.data.curActiveTabIndex
    orderList({ limit: 20, offset: 0, type })
      .then(res => {
        this.setData({ orderList: res })
      })
  },
  clickTab({ currentTarget: { dataset: { index: index } } }) {
    this.setData({ curActiveTabIndex: index })
    this.getOrderList()
  },
  goOrderDetail(e) {
    wx.navigateTo({ url: `/pages/orderdetail/orderdetail?id=${e.detail}` })
  },
  onLoad: function (options) {
    this.getOrderList()
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