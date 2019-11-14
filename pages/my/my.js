//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    serveItems: [
      {
        name: '我的订单',
        icon: 'icon icon-dingdan',
        url: '/pages/my-orders/my-orders'
      },
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
        url: ''
      },
      {
        name: '帮助中心',
        icon: 'icon icon-kefu',
        url: ''
      }
    ]
  }
})
