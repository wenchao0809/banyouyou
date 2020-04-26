// pages/productdetail/productdetail.js
import { getGoodInfo, addCart } from '../../api/index.js'
import { generateSku  } from '../../utils/index'
import PriceManage from '../../utils/price-manage'
import { confirmOrder } from '../../store/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Height: '',
    id: '',
    title: '',
    min_price: '',
    max_price: '',
    original_price: '',
    imgList: [],
    content_pic_list: [],
    price_list: [],
    show: false,
    showFlag: false,
    iconList: [
      {
        text: '首页',
        icon: 'icon-shouye',
        click: false,
        clickColor: '#FFA500',
        url: '/pages/home/home'
      },
      {
        text: '客服',
        icon: 'icon-10',
        click: false,
        clickColor: '#e87584'
      },
      {
        text: '收藏',
        icon: 'icon-shoucang',
        click: false,
        clickColor: '#FFA500'
      }
    ],
    btns: [
      {
        style: '',
        text: '加入购物车'
      },
      {
        style: 'background: #f04347;color: #fff;',
        text: '立即购买',
        url: '/pages/confirm-order/confirm-order'
      }
    ],
    previewImageList: [],
    showPreview: false,
    index: 0
  },
  swiperChange (e) {
    this.setData({
      index: e.detail.current
    })
  },

  showPopup () {
    this.setData({
      show: true
    })
  },
  previewImage({ currentTarget: { dataset: { key: key, item } } }) {
    let data = this.data[key]
    debugger
    wx.previewImage({
      current: item,
      urls: data
    })
  },
  closePreview() {
    this.setData({ showPreview: false })
  },
  cancel () {
    this.setData({
      show: false
    })
  },

  getSkus (e) {
    let skus = e.detail
    console.log(skus)
  },

  onShareAppMessage: function (options) {
  　　// 自定义分享内容
　　var shareObj = {
　　　  title: "板优优",        // 小程序的名称
       path: `/pages/productdetail/productdetail?id=${this.data.id}`,  // 默认是当前页面，必须是以‘/’开头的完整路径
// 　　　　imgUrl: '',     //自定义图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
　　　　success: function (res) {
　　　　　　// 转发成功之后的回调
　　　　　　if (res.errMsg == 'shareAppMessage:ok') {
　　　　　　}
　　　　},
　　　　fail: function () {
　　　　　　// 转发失败之后的回调
　　　　　　if (res.errMsg == 'shareAppMessage:fail cancel') {
  　　　　　　　　// 用户取消转发
　　　　　　} else if (res.errMsg == 'shareAppMessage:fail') {
  　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
　　　　　　}
　　　　},
　　　　complete: function () {
　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
　　　　}
　　}
　　// 来自页面内的按钮的转发
// 　　if (options.from == 'button') {
// 　　　　console.log("来源于button")
// 　　　　// 此处可以修改 shareObj 中的内容
// 　　　　shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name
// 　　}
　　// 返回shareObj
　　return shareObj
  },

  goPoster () {
    let { title, imgList, curPrice, min_price, max_price } = this.data
    let params = {}
    if (curPrice.Id) {
      params = { price: curPrice.Price }
    } else {
      params = { min_price, max_price }
    }
    let goodImage = imgList[0]
    wx.navigateTo({
      url: `/pages/poster/poster?title=${title}&goodImage=${goodImage}`,
      success: function (res) {
        res.eventChannel.emit('getPrice', params)
      }
    })
  },
  sizeChange ({ detail: size }) {
    this.priceMange
      .setSelectedSize(size)
      .connect(this)
  },
  addCart(e) {
    // 在miniCart中统一处理
  },
  toBuy(e) {
    // let title = this.data.title
    // let price = this.data.curPrice.Price
    // let sizeDesc = this.data.desc
    // let image = this.data.imgList[0]
    // confirmOrder.changeGoodList([{title, image, price, sizeDesc, count: e.detail}])
    // wx.navigateTo({url: '/pages/confirm-order/confirm-order'})
  },
  async initData() {
    let id = this.data.id
    let res = await getGoodInfo({ id })
    let original_price = res.original_price ? res.original_price : ''
    // let sku = generateSku(res.price_list)
    this.priceMange = new PriceManage(res.price_list)
    this.priceMange.connect(this)
    this.setData({
      title: res.title,
      min_price: res.min_price,
      max_price: res.max_price,
      original_price,
      imgList: res.top_pic_list,
      content_pic_list: res.content_pic_list,
      price_list: res.price_list,
      current_price: res.price_list[0]
    })
  },
  imgHeight: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth
    var imgh = e.detail.height
    var imgw = e.detail.width
    var swiperH = winWid * imgh / imgw + "px"
    this.setData({
      Height: swiperH
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = parseInt(options.id)
    this.setData({ id })
    this.initData()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    await this.initData()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})