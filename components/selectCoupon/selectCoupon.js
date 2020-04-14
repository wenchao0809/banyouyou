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
     // 订单总金额
     totalMoney: {
      type: Number,
      value: 0
    }
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
      // 总金额减去已优惠金额
      if (!e.detail.checked) {
        this.triggerEvent('selectCoupon', e.detail)
      } else {
        let checkedList = this.properties.availableCouponList.filter((item) => item.checked)
        let availableMoney = this.properties.totalMoney - checkedList.reduce((p, n) => p + n.FullPrice, 0)
        if (availableMoney >= e.detail.FullPrice) {
          this.triggerEvent('selectCoupon', e.detail)
        } else {
          wx.showToast({title: '请先取消勾选其他优惠券',icon:"none"});
        }
      }
    }
  }
})
