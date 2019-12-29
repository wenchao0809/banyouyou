// pages/home/home.js
import { getBanners, getHotGoods, getNewGoods, getCategoryList } from '../../api/index.js'
// const link = require('../../utils/common')
const app = getApp()
var swiperHeight;

Page({
  data: {
    banners: [],
    indicatorDots: true,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    ctrlColor: 'rgba(255,255,255,.5)',
    ctrlCurrentColor: 'white',
    categorysOne: [],
    categorysTwo: [],
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
    // link.showLoading()
    Promise.all([getBanners(), getHotGoods(), getNewGoods(), getCategoryList({ limit: 5, offset: 0 })])
      .then(([banners, hotItems, newGoods, categorys]) => {
        // 分类
        let categorysOne = categorys.slice(0, 2)
        let categorysTwo = categorys.slice(2)
        this.setData({
          banners,
          hotItems,
          newGoods,
          categorysOne,
          categorysTwo
        })
      })
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
  gotoDetail( { currentTarget: { dataset: { goodid: id } } } ) {
    wx.navigateTo({
      url: `/pages/productdetail/productdetail?id=${id}`,
    })
  }
})
