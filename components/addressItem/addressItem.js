// components/addressItem/addressItem.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },

  properties: {
    addressInfo: {
      type: Object,
      value: {}
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
    radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
    editAddress() {
      this.triggerEvent('edit', this.properties.addressInfo)
    },
    deleteAddress() {
      this.triggerEvent('delete', this.properties.addressInfo.Id)
    }
  }
})
