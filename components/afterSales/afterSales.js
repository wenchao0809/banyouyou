// components/afterSales/afterSales.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowPopup:{
      type:Boolean,
      default:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.triggerEvent('close')
    },
    makePhoneCall(e) {
      const phoneNumber = '13377744927'
      wx.makePhoneCall({
        phoneNumber
      })
    },
  }
})
