// pages/add-address/add-address.js
import { opearteAddress,  } from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    person: '',
    phoneRegion_array: ['中国', '其他'],
    index: 0,
    sexs: ['先生', '女士'],
    addressType: ['家里', '学校', '公司', '住址', '其他'],
    sex: '先生',
    phone_region: '中国',
    phone: '',
    category: '家里',
    other: '',
    address: '',
    is_default: false
  },

  bindPickerChange (e) {
    let index = e.detail.value
    this.setData({
      index,
      phone_region: this.data.phoneRegion_array[index]
    })
  },
  tagChange({  currentTarget: { dataset: {name: name } }, detail: value }) {
    this.setData({ [name]: value  })
  },
  inputChange({ currentTarget: { dataset: { name: name } }, detail: { value: value } }) {
    this.setData({ [name]: value })
  },
  defaultChange({ detail: { value: value } }) {
    this.setData({ is_default: value })
  },
  getLocaltion () {
    let that = this
    wx.chooseLocation({
      success: (res) => {
        that.setData({
          address: res.address,
          other: res.name
        })
      }
    })
  },
  saveAddress() {
    // wx.showModal({ title: '提示' })
    let { id, person, sex, phone_region, phone, category, other, address, is_default } = this.data
    let checkPhoneReg = /\d{11}/
    let msg = ''
    if (!person) {
      msg = '请输入联系人'
    } else if(!phone) {
      msg = '请输入联系电话'
    } else if(!checkPhoneReg.test(phone)) {
      msg = '请输入11位联系电话'
    }else if(!address || !other) {
      msg = '经纬度未选取'
    }
    wx.showToast({ title: msg, icon: 'none' })
    if (!msg) {
      // 校验通过
      let params = { id, person, sex, phone_region, phone, category, other, is_default, address }
      opearteAddress(params)
        .then(res => {
          wx.navigateTo({ url: '/pages/address/address' })
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('test pages', options)
    options.is_default = options.is_default === 'false' ? false : true
    if (options.id) {
      this.setData({ ...options })
      wx.setNavigationBarTitle({ title: '编辑收货地址' })
    }

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