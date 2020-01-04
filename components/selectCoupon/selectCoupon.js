// components/popup/popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    curSelectCouponUUID: {
      type: String,
      value: ''
    },
    availableCouponList: {
      type: Array,
      value: []
    },
    unavailableCouponList: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeTabIndex: 0,
    tabs: [{ name: '可用优惠券', id: 1 }, { name: '不可用优惠券', id: 2 }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose () {
      this.triggerEvent('onClose', {})
    },
    changeTab(e) {
      this.setData({ activeTabIndex: e.detail })
    },
    selectCoupon(e) {
      this.triggerEvent('selectCoupon', e.detail)
    }
  }
})
