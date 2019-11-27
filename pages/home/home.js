// pages/home/home.js
const link = require('../../utils/common')
const app = getApp()
var swiperHeight;

Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    ctrlColor: 'rgba(255,255,255,.5)',
    ctrlCurrentColor: 'white',
    navList: [],
    pageRow: [],
    newGoods: [],
    // 热品
    hotItems: [],
    scrollFlag: false,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    showCart: false,
    btns: [
      {
        text: '加入购物车'
      },
      {
        text: '立即购买',
        url: '/pages/confirm-order/confirm-order'
      }
    ]
  },
  // 页面加载
  onLoad(options) {
    // 显示loading
    link.showLoading()

    // 请求首页数据
    // link.ajax({ url: `${app.globalData.defaultURL}/api/profiles/homepage` }, ({ data: res }) => {
      // 关闭loading
      link.hideLoading()

      // 把请求到的值给轮播图的数组
      this.setData({
        imgUrls: [{image: '/image/banner1.jpg'}, {image: '/image/banner2.jpg'}],
        // navList: res.logos,
        // quicks: res.quicks,
        // pageRow: res.pageRow,
        newGoods: [{
          image: '/image/quick2.jpg',
          title: '3厘米全案市场板',
          price: 120,
          count: 260
        },
        {
          image: '/image/quick2.jpg',
          title: '3厘米全案市场板',
          price: 120,
          count: 260
        },
        {
          image: '/image/quick2.jpg',
          title: '3厘米全案市场板',
          price: 120,
          count: 260
        }],
        hotItems: [{
          image: '/image/quick2.jpg',
          title: '3厘米全案市场板',
          curPrice: 120,
          oldPrice: 180,
          count: 260
        },
        {
          image: '/image/quick2.jpg',
          title: '3厘米全案市场板',
          curPrice: 120,
          oldPrice: 180,
          count: 260
        },
        {
          image: '/image/quick2.jpg',
          title: '3厘米全案市场板',
          curPrice: 120,
          oldPrice: 180,
          count: 260
        },
        {
          image: '/image/quick2.jpg',
          title: '3厘米全案市场板',
          curPrice: 120,
          oldPrice: 180,
          count: 260
        }]
      })
    // })
  },
  // 监听滚动条改变搜索框背景
  onPageScroll({ scrollTop: val }) {
    wx.createSelectorQuery()
      .selectAll('.swiper-item')
      .boundingClientRect(rect => {
        swiperHeight = rect[0].height
      }).exec()

    if (val >= swiperHeight) {
      this.setData({
        scrollFlag: true
      })
    } else {
      this.setData({
        scrollFlag: false
      })
    }
  },
  // 选择地区
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  showMinCart () {
    this.setData({
      showCart: true
    })
  },
  onClose () {
    this.setData({
      showCart: false
    })
  },
  gotoDetail() {
    wx.navigateTo({
      url: `/pages/productdetail/productdetail`,
    })
  }
})
