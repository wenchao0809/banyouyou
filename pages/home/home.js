// pages/home/home.js
import { getBanners, getHotGoods, getNewGoods, getCategoryList, getGoodInfo } from '../../api/index.js'
// const link = require('../../utils/common')
import PriceManage from '../../utils/price-manage'

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
    categorys: [],
    pageRow: [],
    newGoods: [],
    // 热品
    hotItems: [],
    scrollFlag: false,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    showCart: false,
    searchText: '',
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
   
  },
  async initData() {
    await Promise.all([getBanners(), getHotGoods(), getNewGoods(), getCategoryList({ limit: 5, offset: 0 })])
    .then(([banners, hotItems, newGoods, categorys]) => {
      // 分类
      let categorysOne = categorys.slice(0, 4)
      let categorysTwo = categorys.slice(4)
      this.setData({
        banners,
        hotItems,
        newGoods,
        categorys,
        categorysOne,
        categorysTwo
      })
    })
  },
  onShow() {
    this.initData()
  },
  // 监听滚动条改变搜索框背景
  // onPageScroll({ scrollTop: val }) {
  //   wx.createSelectorQuery()
  //     .selectAll('.swiper-item')
  //     .boundingClientRect(rect => {
  //       swiperHeight = rect[0].height
  //     }).exec()

  //   if (val >= swiperHeight) {
  //     this.setData({
  //       scrollFlag: true
  //     })
  //   } else {
  //     this.setData({
  //       scrollFlag: false
  //     })
  //   }
  // },
  searchChange(e) {
    this.setData({ searchText: e.detail.value })
  },
  toGoodList() {
    let text = this.data.searchText
    wx.navigateTo({ url: `/pages/good-list/good-list?likeName=${text}` })
  },
  // 选择地区
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  showMinCart ({ currentTarget: { dataset: { goodid: id } } }) {
    getGoodInfo({ id })
      .then(res => {
        let miniCartGoodInfo = {}
        let priceManage = new PriceManage(res.price_list)
        miniCartGoodInfo.priceManage = priceManage
        miniCartGoodInfo.goodInfo = { title: res.title, materials_id: res.Id, image: res.top_pic_list[0]  }
        this.setData({ miniCartGoodInfo })
        this.setMiniCartGoodInfo()
      })
    this.setData({
      showCart: true
    })
  },
  sizeChange(e) {
    let priceManage = this.data.miniCartGoodInfo.priceManage
    priceManage.setSelectedSize(e.detail)
    this.setMiniCartGoodInfo()
  },
  setMiniCartGoodInfo() {
    let priceManage = this.data.miniCartGoodInfo.priceManage
    let miniCartGoodInfo = { ...this.data.miniCartGoodInfo }
    miniCartGoodInfo.sizes = priceManage.sizes
    miniCartGoodInfo.curPrice = priceManage.curPrice
    this.setData({ miniCartGoodInfo })
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
  },
  onPullDownRefresh: async function () {
    await this.initData()
    wx.stopPullDownRefresh()
  }
})
