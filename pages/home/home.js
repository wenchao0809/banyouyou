// pages/home/home.js
import { 
  getBanners, 
  getHotGoods, 
  getNewGoods, 
  getCategoryList, 
  getGoodInfo,
  getAdvertising } from '../../api/index.js'
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
    // 公告
    advertising: {},
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
    await Promise.all([
      getBanners(), 
      getHotGoods(), 
      getNewGoods(), 
      getCategoryList({ limit: 100, offset: 0 }),
      getAdvertising()
    ])
    .then(([banners, hotItems, newGoods, categorys, advertising]) => {
      // 分类
      banners = banners.map(item => {
        item.Info = JSON.parse(item.Info)
        return item
      })
      categorys = this.formateCategorys(categorys)
      this.setData({
        banners,
        hotItems,
        newGoods,
        categorys,
        advertising
      })
    })
  },
  formateCategorys(categorys) {
    let pre = 0,  next = 10
    let results = []
    while(next < categorys.length) {
      let re = categorys.slice(pre, next)
      results.push([re.slice(0, 5), re.slice(5, 10)])
      pre = next
      next += 10
    }
    return results
  },
  onShow() {
    this.initData()
  },
  toClass(e) {
    // app.globalData.classId = e.currentTarget.dataset.classid
    let url = `/pages/class/class?id=${e.currentTarget.dataset.classid}`
    wx.reLaunch({ url })
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
