// pages/cart/cart.js
import { cartList, cartDel, addCart } from '../../api/index'
import { objectToString, setConfirmGoodList } from '../../utils/index'
import { MAXCOUNT } from '../../utils/constant'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    selectedIds: [],
    totalMoney: '0.00',
    totalCount: 0,
    selectAll: false,
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
  getList(flag = true) {
    cartList({ limit: MAXCOUNT, offset: 0 })
      .then(res => {
        res = res ? res : []
        // let totalMoney = res.reduce((p, n) => p + n.price, 0)
        let totalMoney = 0
        for (let i = 0; i < res.length; i++) {
          let item = res[i]
          item.Desc = objectToString(item.DescriptionJson)
          item.select = this.data.selectedIds.includes(item.Id)
          if (item.select) {
            totalMoney += item.Price * item.Number
          }
        }
        if (flag) {
          this.setData({ cartList: res, totalMoney: totalMoney })
        } else {
          this.setData({ totalMoney: totalMoney })
        }
      })
  },
  getCartCount({ currentTarget: { dataset: { index } }, detail }) {
    console.log(index, detail)
    let data = this.data.cartList[index]
    const oldNum = data.Number
    data.Number = detail;
    data.index = index
    this.updateCart(data, oldNum)
  },
  gotoProductDetail({ currentTarget: { dataset: { index } } }) {
    let id = this.data.cartList[index].MaterialsId
    wx.navigateTo({
      url: `/pages/productdetail/productdetail?id=${id}`,
    })
  },
  selectProduct({ currentTarget: { dataset: { index } } }) {

    let totalMoney = Number(this.data.totalMoney),
      totalCount = this.data.totalCount,
      cartList = this.data.cartList,
      selectAll = this.data.selectAll;

    cartList[index].select = !cartList[index].select

    if (cartList[index].select) {
      this.data.selectedIds.push(cartList[index].Id)
      totalMoney += cartList[index].Price * cartList[index].Number;
      totalCount++;
    } else {
      let i = this.data.selectedIds.indexOf(cartList[index].Id)
      this.data.selectedIds.splice(i)
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
  selectGoodAttr() { },
  selectAll() {
    console.log('select all');
    const cartList = this.data.cartList
    let totalMoney = 0 // 合计初始化为0
    let totalCount = 0 // 结算个数初始化为0
    let selectAll = this.data.selectAll

    selectAll = !selectAll // 全选按钮置反
    this.data.selectedIds = cartList.map(item => item.Id)
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
  addNums({ currentTarget: { dataset: { index } } }) {

    let totalMoney = Number(this.data.totalMoney),
      cartList = this.data.cartList;
    ++cartList[index].Number

    if (cartList[index].select) {
      totalMoney += cartList[index].Price;
    }
    let { MaterialsId, PriceId } = cartList[index]
    let number = cartList[index].Number
    let params = { materials_id: MaterialsId, number, price_id: PriceId, is_update: true }
    addCart(params)
      .then(res => {
        this.getList()
      })
    this.setData({
      cartList,
      totalMoney: String(totalMoney.toFixed(2))
    })

  },
  subNums({ currentTarget: { dataset: { index } } }) {
    let totalMoney = Number(this.data.totalMoney),
      cartList = this.data.cartList;
    --cartList[index].Number
    if (cartList[index].select) {
      totalMoney -= cartList[index].Price;
    }
    let { MaterialsId, PriceId } = cartList[index]
    let number = cartList[index].Number
    let params = { materials_id: MaterialsId, number, price_id: PriceId, is_update: true }
    addCart(params)
      .then(res => {
        this.getList()
      })
    this.setData({
      cartList,
      totalMoney: String(totalMoney.toFixed(2))
    })

  },
  updateCart(data, oldNum) {
    let totalMoney = Number(this.data.totalMoney)
    let { MaterialsId, PriceId, select, Price } = data
    // console.log(data)
    const num = data.Number - oldNum;
    if (select) {
      totalMoney += Price * num;
    }
    let params = { materials_id: MaterialsId, number: data.Number, price_id: PriceId }
    params.is_update = true
    addCart(params)
      .then(res => {
        this.data.cartList.splice(data.index, 1, data)
        this.setData({ cartList: [...this.data.cartList], totalMoney: String(totalMoney.toFixed(2)) })
        // this.getList(false)
      })
  },
  tapToConfirmOrder() {
    if (this.data.totalCount === 0) {
      wx.showToast({ title: '你还没有选择商品哦', icon: "none" });
    }
    let { cartList } = this.data
    let goods = cartList.filter(item => item.select)
    if (goods.length === 0) return
    setConfirmGoodList(goods)
    wx.navigateTo({ url: '/pages/confirm-order/confirm-order?type=2' })
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
   *批量删除
   */
  deleteSelect() {
    let { cartList } = this.data
    let goods = cartList.filter(item => item.select)
    let goodIds = goods.map(item => item.Id)
    cartDel({ id: goodIds })
      .then(res => {
        this.getList()
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