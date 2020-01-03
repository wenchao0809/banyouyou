// pages/cart/cart.js
import { cartList } from '../../api/index'
import { objectToString, setConfirmGoodList } from '../../utils/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],
    totalMoney:'0.00',
    totalCount:0,
    selectAll:false,
    showCart: false,
    btns: [
      {
        text: '确定'
      }
    ]
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getList(){
    cartList({})
      .then(res => {
        // let totalMoney = res.reduce((p, n) => p + n.price, 0)
        let list = res.map(item => {
          let Desc = objectToString(item.DescriptionJson)
          item.Desc = Desc
          return item
        })
        this.setData({ cartList: list })
      })
  },
  getCartCount({currentTarget:{dataset:{index}},detail}) {
    this.data.cartList[index].Number = detail;
    this.setData({
      cartList: this.data.cartList
    })
  },
  gotoProductDetail({ currentTarget: { dataset: { index } }}){
    let id = this.data.cartList[index].MaterialsId
    wx.navigateTo({
      url: `/pages/productdetail/productdetail?id=${id}`,
    })
  },
  selectProduct({currentTarget:{dataset:{index}}}) {

    let totalMoney = Number(this.data.totalMoney),
        totalCount = this.data.totalCount,
        cartList = this.data.cartList,
        selectAll = this.data.selectAll;

    cartList[index].select = !cartList[index].select

    if (cartList[index].select) {
      totalMoney += cartList[index].Price * cartList[index].Number;
      totalCount++;
    }else {
      totalMoney -= cartList[index].Price * cartList[index].Number;
      totalCount--;
      selectAll = false
    }
    console.log(totalMoney);
    this.setData({
      cartList,
      totalCount,
      selectAll,
      totalMoney: String(totalMoney.toFixed(2))
    })

  },
  // 选择商品属性
  selectGoodAttr() {},
  selectAll(){
    console.log('select all');
    const cartList = this.data.cartList
    let totalMoney = 0 // 合计初始化为0
    let totalCount = 0 // 结算个数初始化为0
    let selectAll = this.data.selectAll

    selectAll = !selectAll // 全选按钮置反

    cartList.forEach(cart => {
      // 设置选中或不选中状态 每个商品的选中状态和全选按钮一致
      cart.select = selectAll
      // 计算总金额和商品个数
      if (cart.select) { // 如果选中计算
        totalMoney += Number(cart.Price) * cart.Number
        totalCount++
      } else {// 全不选中置为0
        totalMoney = 0
        totalCount = 0
      }

    })
    // 更新data
    this.setData({
      cartList,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount,
      selectAll
    })
  },
  addNums({currentTarget:{dataset:{index}}}){

    let totalMoney = Number(this.data.totalMoney),
        cartList = this.data.cartList;
    ++cartList[index].Number
    if (cartList[index].select) {
      totalMoney += cartList[index].Price;
    }

    this.setData({
      cartList,
      totalMoney: String(totalMoney.toFixed(2))
    })

  },
  subNums({ currentTarget: { dataset: { index } } }){

    let totalMoney = Number(this.data.totalMoney),
        cartList = this.data.cartList;
    --cartList[index].Number
    if (cartList[index].select) {
      totalMoney -= cartList[index].price;
    }

    this.setData({
      cartList,
      totalMoney: String(totalMoney.toFixed(2))
    })

  },
  tapToConfirmOrder() {
    let { cartList } = this.data
    let goods = cartList.filter(item => item.select)
    if (goods.length === 0) return 
    debugger
    setConfirmGoodList(goods)
    wx.navigateTo({ url: '/pages/confirm-order/confirm-order' })
  },
  update: function (index) {
    var cartList = this.data.cartList
    let totalMoney = Number(this.data.totalMoney)
    let totalCount = this.data.totalCount
    // 计算价格和数量
    if (cartList[index].select) {
      totalMoney -= cartList[index].Price * cartList[index].Number
      totalCount--
    }
    // 删除
    cartList.splice(index, 1)
    // 更新数据
    this.setData({
      cartList: this.data.cartList,
      totalCount: totalCount,
      totalMoney: String(totalMoney.toFixed(2))
    })

    // 设置Tabbar图标
    cartList.length > 0 ?
      wx.setTabBarBadge({
        index: 2,
        text: String(cartList.length)
      }) : wx.removeTabBarBadge({
        index: 2,
      })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setStorage({
      key: 'cartInfo',
      data: this.data.cartList,
    })

    this.setData({
      totalMoney: '0.00',
      totalCount: 0,
      selectAll: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})