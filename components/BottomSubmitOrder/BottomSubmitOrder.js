// components/goodItem/goodItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      money: {
        type: Number,
        value: 100
      },
      showCancel: {
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
    cancel() {
      this.triggerEvent('cancel', this.properties.money)
    },
    submit() {
      this.triggerEvent('submit', this.properties.money)
    }
  }
})
