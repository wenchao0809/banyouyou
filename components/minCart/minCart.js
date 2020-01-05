// components/minCart/minCart.js
import { addCart } from '../../api/index'
import { CONFRIMORDERGOODLIST } from '../../utils/constant'
import { setConfirmGoodList } from '../../utils/index'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    btns: {
      type: Array,
      value: []
    },
    style: {
      type: String,
      value: ''
    },
    toastText: {
      type: String,
      value: ''
    },
    goodInfo: {
      type: Object,
      value: {}
    },
    sku: {
      type: Object,
      value: []
    },
    price: {
      type: Object,
      value: {}
    },
    goodInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose () {
      this.triggerEvent('onClose', {})
    },
    getSkus(e) {
      let skus = e.detail
      console.log(skus)
    },
    sizeChange(e) {
      this.triggerEvent('sizeChange', e.detail)
    },
    // 获取数量
    changeNum({ detail: count }) {
      this.setData({ count })
    },
    subCount() {
      let count = this.data.count
      --count
      this.setData({ count })
    },
    addCount() {
      let count = this.data.count
      ++count
      this.setData({ count })
    },
    addCart() {
      let { goodInfo, price } = this.properties
      let materials_id = goodInfo.materials_id
      let number = this.data.count
      let price_id = price.Id
      addCart({ materials_id, number, price_id })
        .then(res => {
          wx.showToast({ title: '添加成功' })
          this.onClose()
        })
    },
    toBuy() {
      let { goodInfo, price } = this.properties
      let { title, image } = goodInfo
      let { desc, Price, Id } = price
      let count = this.data.count
      setConfirmGoodList([{
        priceId: Id,
        title, image,
        sizeDesc: desc,
        price: Price,
        count
      }])
      wx.navigateTo({url: '/pages/confirm-order/confirm-order?type=1'})
    },
    clickBtn (e) {
      let name = e.target.dataset.name
      if (name === '加入购物车') {
        this.triggerEvent('addCart', this.data.count)
        this.addCart()
      } else if (name === '立即购买') {
        this.triggerEvent('toBuy', this.data.count)
        this.toBuy()
      }
    }
  }
})
