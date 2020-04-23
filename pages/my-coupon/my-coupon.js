// pages/my-coupon/my-coupon.js
import { getCouponList } from '../../api/index.js'

Page({
  limit: 20,
  pageIndex: 1,
  type: 1,

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    Status1Total: 0,
    Status2Total: 0,
    Status3Total: 0,
    couponList: [],
    loadMore: '正在加载...',
    loadDone: false,
    couponCustomStyle: `background-image: url("https://housestore.oss-cn-hangzhou.aliyuncs.com/2020-04-15/363f5fe1-5f4a-4e26-978f-9d4d0b086e99.jpeg"); background-size: cover`
  },

  getList(type = 'load') {
    getCouponList({ limit: this.limit, offset: (this.pageIndex - 1) * 20, type: this.type }).then(res => {
      let data = res.list
      let { Status1Total, Status2Total, Status3Total } = res
      if (type === 'load') {
        let curData = this.data.couponList
        data = curData.concat(res.list)
      }
      this.setData({ couponList: data, Status1Total, Status2Total, Status3Total })
    })
  },
  loadMore() {
    let { couponList, totalCount } = this.data
    this.setData({ loadMoreText: '正在加载...' })
    if (couponList.length ===  totalCount) {
        let that = this
        that.setData({ loadMoreText: '没有更多数据' })
        setTimeout(() => {
          that.setData({ loadMoreText: '' })
        }, 1000);
        return
    }
    this.pageIndex++
    this.getList()
  },
  refreshData() {
    this.pageIndex = 1
    this.getList('refresh')
  },
  tabContent(e) {
    let tabIndex = e.target.dataset.item
    this.type = tabIndex + 1
    this.pageIndex = 1
    this.setData({
      tabIndex
    })
    this.getList('refresh')
  },

  changeTabIndex(e) {
    this.type = e.detail.current + 1,
    this.setData({
      tabIndex: e.detail.current
    })
    this.getList('refresh')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList('refresh')
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
    this.pageIndex++
    getCouponList({ limit: this.limit, offset: (this.pageIndex - 1) * 20, type: this.type }).then(res => {
      console.log(res)
    })
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