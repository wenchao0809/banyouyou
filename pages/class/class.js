// pages/class/class.js
import { getCategoryList, getCategoryGoodList } from '../../api/index.js'

const app = getApp();
const link = require('../../utils/common.js')
const sortMap = {
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
    // 显示loading
    link.showLoading()

    // 请求分类数据
    // link.ajax({ url: `${app.globalData.defaultURL}/api/profiles/productions`},({data:res})=> {
      getCategoryList()
        .then(res => {
          this.setData({
            navLeftItems: res
          })
        })
      this.setData({
        navRightItems: [{
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
      
      // 隐藏loading
      link.hideLoading()
    // })
  },
  // 改变tab栏
  currentTabs({currentTarget:{dataset:{index:index}}}){
    this.setData({
      curIndex: index,
      curItem: this.data.navLeftItems[index]
    })
    let curItem = this.data.curItem
    getCategoryGoodList({ id:  curItem.Id, ...this.data.query })
      .then(res => this.setData({ navRightItems: res }))
  },
  // 去往列表页
  gotoProductDetail({ currentTarget: { dataset:{product:name}} }){
    wx.navigateTo({
      url: `/pages/productdetail/productdetail`
      // url: `/pages/productlist/productlist?name=${name}`
    })
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
  },
  showMinCart() {
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