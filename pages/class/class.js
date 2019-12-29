// pages/class/class.js
import { getCategoryList, getCategoryGoodList, getGoodInfo } from '../../api/index.js'

const app = getApp();
const link = require('../../utils/common.js')
const sortTypeMap = {
  bysum: 0,
  priceDesc: 1,
  priceAsc: 2,
  count: 3
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems:[],  // 左侧导航
    navRightItems:[], // 右侧产品
    query: {
      limit: 20,
      offset: 0,
      sortType: 0 //排序方式: 0:综合排序. 1: 价格从高到低, 2: 价格从低到高, 3: 按销量
    },
    orderName: 'bysum',
    curItem: {},
    curIndex:0,
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
    // 请求分类数据
      getCategoryList({ limit: 100, offset: 0 })
        .then(res => {
          this.setData({
            navLeftItems: res
          })
          this.getNavRightItems()
          wx.hideLoading()
        })
      // 隐藏loading
  },
  // 改变tab栏
  currentTabs({currentTarget:{dataset:{index:index}}}){
    this.setData({
      curIndex: index
    })
    this.getNavRightItems()
  },
  getNavRightItems() {
    let { query, orderName, navLeftItems } = this.data
    let curItem = navLeftItems[this.data.curIndex]
    query.sortType = sortTypeMap[orderName]
    getCategoryGoodList({ id:  curItem.Id, ...this.data.query })
      .then(res => {
        this.setData({ navRightItems: res })
      })
  },
   // 去往列表页
  gotoProductDetail({ currentTarget: { dataset:{ goodid: id }} }){
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
  showMinCart({currentTarget: { dataset: { goodid: id } }}) {
    getGoodInfo({ id })
      .then(res => {
        console.log(res)
      })
    this.setData({
      showCart: true
    })
  },
  onClose() {
    this.setData({
      showCart: false
    })
  }
})