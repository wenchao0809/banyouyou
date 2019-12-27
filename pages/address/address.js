// pages/address/address.js
import { getUserAddress, opearteAddress } from '../../api/index'

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

  editAddress({ detail: address }) {
    let { Id, Address, Phone, Category, IsDefault, Other, Person, PhoneRegion, Sex  } = address
    wx.navigateTo({ 
      url: `/pages/add-address/add-address?id=${Id}&address=${Address}&phone=${Phone}&` +
           `category=${Category}&is_default=${IsDefault}&other=${Other}&person=${Person}` +
           `&phone_region=${PhoneRegion}&sex=${Sex}`
    })
  },
  deleteAddress({ detail: id }) {
    opearteAddress({ id, is_delete: true })
      .then(res => {
        this.getAddressList()
        wx.showToast({ title: '删除成功' })
      })
  },
  getAddressList() {
    getUserAddress(this.data.query)
    .then(res => this.setData({ addressList: res }))
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressList()
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