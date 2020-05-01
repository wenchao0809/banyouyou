// pages/member/member.js
import { USERINFO } from '../../utils/constant'
import { connect, extract } from 'mobx-wxapp'
import { user } from '../../store/index'
import { getUserInfo } from '../../api/index'
import { getToken } from '../../utils/http'
const vipLevelMapStr = {
  '0': 'VIP0',
  '1': 'VIP1',
  '2': 'VIP2',
  '3': 'VIP3',
  '4': 'VIP4',
  '5': 'VIP5',
  '6': 'VIP6',
  '7': 'VIP白银',
  '8': 'VIP黄金',
  '9': 'VIP白金',
  '10': 'VIP钻石',
  '11': 'VIP至尊'
}
const integrals = {
  "VIP0": 0,
  "VIP1": 500,
  "VIP2": 1000,
  "VIP3": 2000,
  "VIP4": 5000,
  "VIP5": 10000,
  "VIP6": 20000,
  "VIP白银": 50000,
  "VIP黄金": 80000,
  "VIP白金": 100000,
  "VIP钻石": 200000,
  "VIP至尊": 500000
}

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag: false,
    privilegeDesc: [
      '',
      "全场99折！同时获得5张100元抵扣券。（抵扣券有效期30天）。注册用户生日或营业执照注册日当天享全场商品985折！只限现金交易。",
      "享受产品985折，获1万元平台支持额度。账期30天后支付。同时获得10张100元抵扣券。（抵扣券有效期45天）注册用户生日或营业执照注册日当天享全场商品98折！只接受现金。",
      "享受产品98折，获2万元平台支持额度。账期35天后支付。同时获得20张100元抵扣券。（抵扣券有效期60天）。注册用户生日或营业执照注册日当天享全场商品975折！只接受现金。",
      "享受产品975折，获5万元平台支持额度。账期40天后支付。同时获得50张100元抵扣券。（抵扣券有效期75天）注册用户生日或营业执照注册日当天享全场商品97折！（购货限额15万元）只接受现金。",
      "享受产品97折，获10万元平台支持额度。账期45天后支付。同时获得100张100元抵扣券。（抵扣券有效期90天）。注册用户生日或营业执照注册日当天享全场商品965折！（购货限额20万）。只接受现金。",
      "享受产品965折，获20万平台支持额度。账期50天后支付。同时获得200张100元抵扣券。（抵扣券有效期105天）。注册用户生日或营业执照注册日当天享全场商品96折！（购货限额25万）。只接受现金。",
      "享受产品96折，获50万平台支持额度。账60天后支付。同时获得500张100元抵扣券。（抵扣券有效期120天）。注册用户生日或营业执照注册日当天享全场商品955折！（购货限额30万）。只接受现金。",
      "享受产品955折，获80万平台支持额度。账期80天后支付。同时获得800张100元抵扣券。（抵扣券有效期135天）。注册用户生日或营业执照注册日当天享全场商品95折！（购货限额35万）。只接受现金。",
      "享受产品95折，获100万平台支持额度。账期100天后支付。同时获得1000张100元抵扣券。（抵扣券有效期150天）。注册用户生日或营业执照注册日当天享全场商品945折！（购货限额40万）。只接受现金。",
      "天后支付。同时获得2000张100元抵扣券。（抵扣券有效期165天）。注册用户生日或营业执照注册日当天享全场商品94折！（购货限额45万）。只接受现金。",
      "享受产品94折，获500万平台支持额度。账期140天后支付。同时获得5000张100元抵扣券。（抵扣券有效期180天）。注册用户生日或营业执照注册日当天享全场商品935折！（购货限额50万）。只接受现金。"
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
    percent: 0,
    nextPoints: 0,
    nextLevelStr: '',
    user: {},
    couponCount: 0,
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
  async getUserInfo() {
    return new Promise((resolve, reject) => {
      let token = getToken()
      if (token) {
        getUserInfo()
          .then(res => {
            user.changeUser(res)
            wx.setStorageSync(USERINFO, res)
            this.setData({ couponCount: res.CouponCount })
            resolve(res)
          })
      } else {
        reject()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    connect(this, () => ({
      user: { ...extract(user) }
    }))
    try {
      let userInfo = await this.getUserInfo()
      let vipLevelStr = vipLevelMapStr[userInfo.VipLevel]
      let nextPoints,
        percent

      // if (userInfo.VipLevel < 11) {
      //   let nextLevel = userInfo.VipLevel + 1
      //   let nextLevelStr = vipLevelMapStr[nextLevel]
      //   let curPoints = userInfo.Points
      //   let curLevelPoints = integrals[vipLevelStr]
      //   nextPoints = integrals[nextLevelStr]
      //   let donePoints = curPoints - curLevelPoints
      //   percent = donePoints / (nextPoints - curLevelPoints)
      // }
      let nextLevel = userInfo.VipLevel < 11 ? userInfo.VipLevel + 1 : userInfo.VipLevel
      let nextLevelStr = vipLevelMapStr[nextLevel]
      let curPoints = userInfo.Points
      let curLevelPoints = integrals[vipLevelStr]
      nextPoints = integrals[nextLevelStr]
      let donePoints = curPoints - curLevelPoints
      percent = userInfo.VipLevel < 11 ? (donePoints / (nextPoints - curLevelPoints)) : 100
      this.setData({ userInfo, percent, nextPoints, vipLevelStr, nextLevelStr })
    } catch {
      wx.redirectTo({ url: '/pages/login/login' })
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