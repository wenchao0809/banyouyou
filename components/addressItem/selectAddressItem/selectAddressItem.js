// components/addressItem/selectAddressItem/selectAddressItem.js
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
      value: [{}, {}]
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
      this.triggerEvent('selectAddress', parseInt(e.detail.value))
      // console.log('radio发生change事件，携带value值为：', e)
    }
  }
})
