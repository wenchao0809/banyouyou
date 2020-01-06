// pages/orderdetail/orderdetail.js
import { orderInfo } from '../../api/index.js'
import { ORDERSTATUS } from '../../utils/constant'
import { objectToString, formateDate } from '../../utils/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList: [{
      title: '5厘米全杨油漆板',
      price: 4499.00,
      total: 10,
      count: 1,
      image: '/image/quick3.jpg'
    },
    {
      title: '阻燃中纤板',
      price: 124,
      count: 10,
      size: '15mm',
      image: '/image/quick3.jpg'
    }],
    id: '',
    orderInfo: {},
    orderStatusMap: ORDERSTATUS
  },

  contactMerchant () {
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = parseInt(options.id)
    this.setData({ id  })
    orderInfo({ id })
      .then(res => {
        res.createDateStr = formateDate(res.CreatedAt)
        res.order_item = res.order_item.map(item => {
          item.sizeDesc = objectToString(item.description)
          return item
        })
        this.setData({ orderInfo: res })
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