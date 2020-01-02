
import { getUserCoupon } from '../../api/index'
import { getConfirmOrderAddress } from '../../utils/index'
import { CONFRIMORDERGOODLIST, CONFIRMORDERADDRESS, MAXCOUNT } from '../../utils/constant'


Page({
    data: {
      address: {},
      totalMoney: 0,
      couponList: [],
      goodList: []
    },
    toSelectAddress() {
      wx.navigateTo({ url: `/pages/selectAddress/selectAddress?id=${this.data.address.Id}` })
    },
    onLoad() {
      getUserCoupon({ limit: MAXCOUNT, offset: 0, type: 0 })
        .then(res => {
          if (res) this.setData({ couponList: res })
        })
    },
    async onShow() {
      let address = await getConfirmOrderAddress()
      try {
        var goodList = wx.getStorageSync(CONFRIMORDERGOODLIST)
        if (goodList) {
          let totalMoney = goodList.reduce((p, n) => p + n.price, 0)
          this.setData({
            address,
            goodList,
            totalMoney
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