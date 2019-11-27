// pages/class/class.js
const app = getApp();
const link = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems:[],  // 左侧导航
    navRightItems:[], // 右侧产品
    orderName: '',
    curIndex:0,
    showCart: false,
    btns: [
      {
        text: '加入购物车'
      },
      {
        text: '立即购买'
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
      this.setData({
        navLeftItems: ['厚芯板', '阻燃防水板', '家具板', '中迁板', '特价处理', '预定处理', '抢购特惠'],
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
  currentTabs({currentTarget:{dataset:{index:item}}}){
    this.setData({
      curIndex:item
    })
  },
  // 去往列表页
  gotoProductDetail({ currentTarget: { dataset:{product:name}} }){
    wx.navigateTo({
      url: `/pages/productlist/productlist?name=${name}`
    })
  },
  // order change
  handleOrderChange(e) {
    console.log(e)
    this.setData({
      orderName: e.target.dataset.name
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