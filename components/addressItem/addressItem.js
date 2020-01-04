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
      debugger
      this.triggerEvent('setDefault', e.detail.value)
    },
    editAddress({ currentTarget: { dataset: { item: item } } }) {
      this.triggerEvent('edit', item)
    },
    deleteAddress({ currentTarget: { dataset: { item: item } } }) {
      this.triggerEvent('delete', item.Id)
    }
  }
})
