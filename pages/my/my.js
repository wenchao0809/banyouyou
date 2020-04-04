//index.js
//获取应用实例
import { getToken } from '../../utils/http'
import { getUserInfo, uploadImage } from '../../api/index'
import { connect, extract } from 'mobx-wxapp'
import { user } from '../../store/index'
import { USERINFO } from '../../utils/constant'

const app = getApp()

Page({
  data: {
    orderNavItems: [
      {
        name: '待发货',
        icon: 'icon icon-daifahuo',
        url: '/pages/my-orders/my-orders?tabName=confirming'
      },
      {
        name: '待收货',
        icon: 'icon icon-daishouhuo',
        url: '/pages/my-orders/my-orders?tabName=confirmed'
      },
      {
        name: '结算明细',
        icon: 'icon icon-daifukuan',
        url: '/pages/my-orders/my-orders?tabName=received'
      },
      {
        name: '退款/售后',
        icon: 'icon icon-tuikuan',
        url: '/pages/my-orders/my-orders?tabName=refund'
      }
    ],
    serveItems: [
      // {
      //   name: '我的订单',
      //   icon: 'icon icon-dingdan',
      //   url: '/pages/my-orders/my-orders'
      // },
      {
        name: '我的优惠券',
        icon: 'icon icon-quan',
        url: '/pages/my-coupon/my-coupon'
      },
      {
        name: '收货地址',
        icon: 'icon icon-dizhi',
        url: '/pages/address/address'
      },
      {
        name: '关于我们',
        icon: 'icon icon-xinxi',
        url: '/pages/about/about'
      },
      {
        name: '意见反馈',
        icon: 'icon icon-fankuiyijianfankui-xianxing',
        url: '/pages/feedback/feedback'
      },
      {
        name: '设置',
        icon: 'icon icon-shezhi',
        url: '/pages/set/set'
      },
      {
        name: '帮助中心',
        icon: 'icon icon-kefu',
        url: ''
      }
    ],
    user: {},
    couponCount: 0
  },
  onLoad() {
    let userInfo = wx.getStorageSync(USERINFO)
    this.setData({ couponCount: userInfo.CouponCount })
    console.log('load my page')
    connect(this, () => ({
      user: { ...extract(user) }
    }))
    console.log('show my page')
    this.getUserInfo()
  },
  onShow() {
    console.log('show my page')
    this.getUserInfo()
  },
  getUserInfo() {
    let token = getToken()
    if (token) {
      getUserInfo()
        .then(res => {
          user.changeUser(res)
          wx.setStorageSync(USERINFO, res)
        })
    } else {
      wx.redirectTo({ url: '/pages/login/login' })
    }
  },
  goMember () {
    wx.navigateTo({
      url: '/pages/member/member'
    })
  },
  goCoupon() {
    wx.navigateTo({
      url: '/pages/my-coupon/my-coupon'
    })
  },
  takePhoto() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        uploadImage({ filePath: tempFilePaths[0], name: 'file' })
          .then(res => {
            console.log('headerPic', res)
            user.changeUser({ HeaderPic: res })
          })
      }
    })
  },
  toMyorder({currentTarget: { dataset: { url: url } }}) {
    wx.navigateTo({ url})
  },
  logout() {
    wx.removeStorageSync('token')
    wx.navigateTo({ url: '/pages/login/login' })
  },
  toDistribute() {
    wx.navigateTo({ url: '/pages/distributor/distributor' })
  }
})
