
Component({
  /**
   * 组件的属性列表
   */
  options: {
  },
  properties: {
    show: {
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
    onClose() {
      this.triggerEvent('close')
    },
    confirm() {
      wx.makePhoneCall({
        phoneNumber: '13377744329' //仅为示例，并非真实的电话号码
      })
    }
  }
})
