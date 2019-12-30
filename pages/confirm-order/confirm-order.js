import { connect, extract } from 'mobx-wxapp'
import { confirmOrder } from '../../store/index'

Page({
    data: {
        goodList: []
    },
    toSelectAddress() {
      wx.navigateTo({ url: '/pages/selectAddress/selectAddress' })
    },
    onLoad() {
      connect(this, () => ({
        goodList: confirmOrder.goodList
      }), {setDataCallback: ({ goodList }) => { 
        let totalMoney = goodList.reduce((p, c) => {
          return p += c.price * c.count
        }, 0)
        this.setData({ totalMoney })
      } })
    }
})