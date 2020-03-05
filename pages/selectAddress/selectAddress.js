// pages/selectAddress/selectAddress.js
import { getUserAddress } from '../../api/index.js'
import { saveConfirmOrderAddress } from '../../utils/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curSelectAddressId: '',
    addressList: []
  },

  getWxAddress () {
    wx.chooseAddress({
      success(res) {
        // console.log(res.userName)
        // console.log(res.postalCode)
        // console.log(res.provinceName)
        // console.log(res.cityName)
        // console.log(res.countyName)
        // console.log(res.detailInfo)
        // console.log(res.nationalCode)
        // console.log(res.telNumber)
      }
    })
  },
  selectAddress(e) {
    let address = this._findAddressById(parseInt(e.detail))
    saveConfirmOrderAddress(address)
    wx.navigateBack({
      delta: 1
    })
  },
  _findAddressById(id) {
    let address
    for (let item of this.data.addressList) {
      if (item.Id === id) {
        address = item
        break
      }
    }
    return address
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = parseInt(options.id)
    getUserAddress()
      .then(res => {
        for (let item of res) {
          if (item.Id === id) {
            item.selected = true
            break
          }
        }
        this.setData({ addressList: res })
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