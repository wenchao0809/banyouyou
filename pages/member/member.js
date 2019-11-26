// pages/member/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag: false,
    integrals: {
      "VIP0": 0,
      "VIP1": 500,
      "VIP2": 2000,
      "VIP3": 5000,
      "VIP4": 10000,
      "VIP5": 30000,
      "VIP6": 50000,
      "VIP黄金": 80000,
      "VIP白金": 100000,
      "VIP钻石": 200000,
      "max": Infinity
    },
    currentIntegral: {
      title: "",
      percent: 0
    },
    integral: 6000,
    privilegeDesc: [
      "全场99折！",
      "享受产品98折，获5000元平台支持额度。账期30天后支付。同时获得5张100元购物券。有效期30天。注册用户生日或营业执照注册日当天享全场商品97折！只接受现金。",
      "享受产品97折，获2万元平台支持额度。账期30天后支付。同时获得20张100元购物券。有效期45天。注册用户生日或营业执照注册日当天享全场商品96折！只接受现金。",
      "享受产品96折，获5万元平台支持额度。账期45天后支付。同时获得50张100元购物券。有效期60天。注册用户生日或营业执照注册日当天享全场商品95折！只接受现金。",
      "享受产品95折，获10万元平台支持额度。账期50天后支付。同时获得100张100元购物券。有效期90天注册用户生日或营业执照注册日当天享全场商品94折！限额15万。只接受现金。",
      "享受产品94折，获30万元平台支持额度。账期60天后支付。同时获得300张100元购物券。有效期120天。注册用户生日或营业执照注册日当天享全场商品93折！限额20万。只接受现金。",
      "享受产品93折，获50万平台支持额度。账期90天后支付。同时获得500张100元购物券。有效期150天。注册用户生日或营业执照注册日当天享全场商品92折！限额25万。只接受现金。",
      "享受产品92折，获80万平台支持额度。账期120天后支付。同时获得800张100元购物券。有效期180天。注册用户生日或营业执照注册日当天享全场商品91折！限额30万，只接受现金。",
      "享受产品91折，获100万平台支持额度。账期150天后支付。同时获得1000张100元购物券。有效期240天。注册用户生日或营业执照注册日当天享全场商品9折！限额45万，只接受现金。",
      "享受产品9折，获200万平台支持额度。账期180天后支付。同时获得2000张100元购物券。有效期360天。注册用户生日或营业执照注册日当天享全场商品88折！限额60万，只接受现金。"
    ],
    quota: [
      "0",
      "5000",
      "20000",
      "50000",
      "100000",
      "300000",
      "500000",
      "800000",
      "1000000",
      "2000000"
    ],
    privilegeDescIndex: 0
  },

  showModal () {
    this.setData({
      showFlag: true
    })
  },

  cancelModal() {
    this.setData({
      showFlag: false
    })
  },

  goCoupon () {
    wx.navigateTo({
      url: '/pages/my-coupon/my-coupon'
    })
  },

  goMemberData () {
    wx.navigateTo({
      url: '/pages/memberData/memberData'
    })
  },

  goMemberIntroduction () {
    wx.navigateTo({
      url: '/pages/memberIntroduction/memberIntroduction'
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
    let integrals = this.data.integrals
    let integral = this.data.integral
    let arr = Object.keys(integrals)
    for (let i = 0, len = arr.length; i < len; i++) {
      if (integrals[arr[i]] <= integral && integrals[arr[i + 1]] > integral) {
        let currentIntegral = {}
        let percent = 0
        if (integrals[arr[i]] === integrals["VIP钻石"]) {
          percent = 100
        } else {
          let diffValueMax = integrals[arr[i + 1]] - integrals[arr[i]]
          let diffValue = integral - integrals[arr[i]]
          percent = ((diffValue / diffValueMax) * 100).toFixed(2)
        }
        currentIntegral.title = arr[i]
        currentIntegral.percent = percent
        this.setData({
          currentIntegral,
          privilegeDescIndex: i
        })
      }
    }
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