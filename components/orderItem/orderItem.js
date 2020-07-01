// components/sku/sku.js
import { ORDERSTATUS } from '../../utils/constant'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderStatusMap: ORDERSTATUS,
    showPopup: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goOrderDetail() {
      let Id = this.properties.orderInfo.id
      this.triggerEvent('goOrderDetail', Id)
    },
    showPopup() {
      this.setData({ showPopup: true })
    },
    closePopup () {
      this.setData({ showPopup: false })
    }
  }
})
