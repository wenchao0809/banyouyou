// pages/productdetail/productdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [
      '/image/quick2.jpg',
      '/image/quick2.jpg'
    ],
    show: false,
    showFlag: false,
    sku: {
      '厚度': ['5MM', '9MM', '12MM', '5MM', '9MM', '12MM'],
      '环保级别': ['5MM', '9MM', '12MM']
    },
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
　　　  title: "转发的标题",        // 小程序的名称
       path: '/pages/productdetail/productdetail',  // 默认是当前页面，必须是以‘/’开头的完整路径
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
    wx.navigateTo({
      url: '/pages/poster/poster'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})