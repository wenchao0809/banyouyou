// pages/add-address/add-address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['中国', '其他'],
    index: 0,
    sex: ['先生', '女士'],
    addressType: ['家里', '学校', '公司', '住址', '其他'],
    address: '',
    addressName: ''
  },

  bindPickerChange (e) {
    let index = e.detail.value
    this.setData({
      index
    })
  },

  getLocaltion () {
    let that = this
    wx.chooseLocation({
      success: (res) => {
        that.setData({
          address: res.address,
          addressName: res.name
        })
      }
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