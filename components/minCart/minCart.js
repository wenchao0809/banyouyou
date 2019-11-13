// components/minCart/minCart.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    btnType: {
      type: String,
      value: 'addCart'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sku: {
      '厚度': ['5MM', '9MM', '12MM', '5MM', '9MM', '12MM'],
      '环保级别': ['5MM', '9MM', '12MM']
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose () {
      this.triggerEvent('onClose', {})
    },
    getSkus(e) {
      let skus = e.detail
      console.log(skus)
    }
  }
})
