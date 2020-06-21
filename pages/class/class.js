// pages/class/class.js
import { getCategoryList, getCategoryGoodList, getGoodInfo } from '../../api/index.js'
import PriceManage from '../../utils/price-manage'

const app = getApp();
const link = require('../../utils/common.js')
const sortTypeMap = {
  bysum: 0,
  priceDesc: 1,
  priceAsc: 2,
  bycount: 3
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems: [],  // 左侧导航
    navRightItems: [], // 右侧产品
    query: {
      limit: 20,
      offset: 0,
      sortType: 0 //排序方式: 0:综合排序. 1: 价格从高到低, 2: 价格从低到高, 3: 按销量
    },
    orderName: 'bysum',
    curItem: {},
    curIndex: 0,
    showCart: false,
    miniCartGoodInfo: {},
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 分类id
    let id = parseInt(options.id)
    // 请求分类数据
    getCategoryList({ limit: 100, offset: 0 })
      .then(res => {
        this.setData({
          navLeftItems: res
        })
        let index = 0
        if (id) {
          for (let i = 0; i < res.length; i++) {
            if (res[i].Id === id) {
              index = i
            }
          }
        }
        this.currentTabs(index)
        wx.hideLoading()
      })
    // 隐藏loading
  },
  // 改变tab栏
  currentTabs(e) {
    let curIndex = e
    if (typeof e === 'object') {
      curIndex = e.currentTarget.dataset.index
    }
    this.setData({
      curIndex
    })
    this.getNavRightItems()
  },
  getNavRightItems() {
    let { query, orderName, navLeftItems } = this.data
    let curItem = navLeftItems[this.data.curIndex]
    query.sortType = sortTypeMap[orderName]
    getCategoryGoodList({ id: curItem.Id, ...this.data.query })
      .then(res => {
        this.setData({ navRightItems: res })
      })
  },
  // 去详情页
  gotoProductDetail({ currentTarget: { dataset: { goodid: id } } }) {
    wx.navigateTo({
      url: `/pages/productdetail/productdetail?id=${id}`
      // url: `/pages/productlist/productlist?name=${name}`
    })
  },
  parse(data) {
    return JSON.parse(data)
  },
  // order change
  handleOrderChange(e) {
    console.log(e)
    let orderName = e.target.dataset.name || e.currentTarget.dataset.name
    if (orderName === 'byprice') {
      // 默认升序
      orderName = this.data.orderName === 'priceAsc' ? 'priceDesc' : 'priceAsc'
    }
    this.setData({
      orderName: orderName
    })
    this.getNavRightItems()
  },
  showMinCart({ currentTarget: { dataset: { goodid: id } } }) {
    getGoodInfo({ id })
      .then(res => {
        let miniCartGoodInfo = {}
        let priceManage = new PriceManage(res.price_list)
        miniCartGoodInfo.priceManage = priceManage
        miniCartGoodInfo.goodInfo = { title: res.title, materials_id: res.Id, image: res.top_pic_list[0] }
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
  searchChange(e) {
    this.setData({ searchText: e.detail.value })
  },
  toGoodList() {
    let text = this.data.searchText
    wx.navigateTo({ url: `/pages/good-list/good-list?likeName=${text}` })
  },
  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  onClose() {
    this.setData({
      showCart: false
    })
  }
})