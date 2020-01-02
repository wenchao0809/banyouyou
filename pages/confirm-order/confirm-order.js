
import { getUserAddress } from '../../api/index'
import { getDefaultAddress } from '../../utils/index'
import { CONFRIMORDERGOODLIST } from '../../utils/constant'

Page({
    data: {
      address: {},
      totalMoney: 0,
      goodList: []
    },
    toSelectAddress() {
      wx.navigateTo({ url: '/pages/selectAddress/selectAddress' })
    },
    async onLoad() {
      let address = await getDefaultAddress()
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
    }
})