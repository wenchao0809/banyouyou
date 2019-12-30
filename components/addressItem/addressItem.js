// components/addressItem/addressItem.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },

  properties: {
    addressList: {
      type: Array,
      value: []
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
      this.triggerEvent('change', e.detail.value)
      console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
    editAddress(item) {
      this.triggerEvent('edit', item)
    },
    deleteAddress(item) {
      this.triggerEvent('delete', item.Id)
    }
  }
})
