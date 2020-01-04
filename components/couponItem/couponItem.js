// components/couponItem/couponItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    couponInfo: {
      type: Object,
      value: {}
    },
    disableSelect: {
      type: Boolean,
      value: false
    },
    checked: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    valueChange(e) {
      if (!e.detail) return
      let data = this.properties.couponInfo
      this.triggerEvent('checkedChange', data)
    }
  }
})
