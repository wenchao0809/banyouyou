
import { getUserCoupon, newOrder } from '../../api/index'
import { getConfirmOrderAddress } from '../../utils/index'
import { CONFRIMORDERGOODLIST, CONFIRMORDERADDRESS, MAXCOUNT, USERINFO } from '../../utils/constant'


Page({
    data: {
      address: {},
      // 用户信息用于获取vip折扣
      userInfo: {},
      // 订单总金额
      totalMoney: 0,
      // 优惠金额
      discountMoney: 0,
      // 应付金额
      orderMoney: 0,
      // 当前使用优惠券，默认使用优惠金额最高的
      curCoupon: {},
      couponList: [],
      availableCouponList: [],
      orderAvailableCouponList: [],
      orderUnavailableCouponList: [],
      goodList: [],
      showCouponSelector: false
    },
    toSelectAddress() {
      wx.navigateTo({ url: `/pages/selectAddress/selectAddress?id=${this.data.address.Id}` })
    },
    submitOrder() {
      let address_id = this.data.address.Id
      let coupon_list = []
      let total_price = this.data.orderMoney * 1000
      let price_list = this.data.goodList.map(item => ({ id: item.priceId, number: item.count }))
      newOrder({ address_id, coupon_list, total_price, price_list })
        .then(res => {
          debugger
        })
    },
    closeCouponSelector() {
      this.setData({ showCouponSelector: false })
    },
    showCouponSelector() {
      this.setData({ showCouponSelector: true })
    },
    setCouponList(totalMoney) {
      getUserCoupon({ limit: MAXCOUNT, offset: 0, type: 0 })
      .then(res => {
        let availableCouponList = res.filter(item => item.Status === 1)
        let orderAvailableCouponList = availableCouponList.filter(item => totalMoney >= item.FullPrice)
        let orderUnavailableCouponList = availableCouponList.filter(item => totalMoney < item.FullPrice)
        let curCoupon
        if(orderAvailableCouponList.length > 0) {
          let sortList = [ ...orderAvailableCouponList ]
          sortList.sort((p, n) => n.Price - p.Price)
          curCoupon = sortList[0]
        }
        this.setData({
          curCoupon,
          availableCouponList,
          orderAvailableCouponList,
          orderUnavailableCouponList
        })
      })
    },
    selectCoupon(e) {
      this.setData({ curCoupon: e.detail })
    },
    onLoad() {
    },
    async onShow() {
      let address = await getConfirmOrderAddress()
      try {
        var goodList = wx.getStorageSync(CONFRIMORDERGOODLIST)
        var userInfo = wx.getStorageSync(USERINFO)
        if (goodList) {
          let totalMoney = goodList.reduce((p, n) => p + n.price * n.count, 0)
          this.setCouponList(totalMoney)
          this.setData({
            userInfo,
            address,
            goodList,
            totalMoney,
            orderMoney: totalMoney
          })
        }
      } catch (e) {
        // Do something when catch error
      }
    },
    onHide: function () {
      console.log('hide confirm page')
      wx.removeStorage({ key: CONFIRMORDERADDRESS })
    },
    onUnload: function () {
       // 首次加载选默认地址
       wx.removeStorageSync(CONFIRMORDERADDRESS)
    }
})