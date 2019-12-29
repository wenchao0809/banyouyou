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
    btns: {
      type: Array,
      value: []
    },
    style: {
      type: String,
      value: ''
    },
    toastText: {
      type: String,
      value: ''
    },
    goodInfo: {
      type: Object,
      value: {}
    },
    sku: {
      type: Object,
      value: []
    },
    price: {
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
    onClose () {
      this.triggerEvent('onClose', {})
    },
    getSkus(e) {
      let skus = e.detail
      console.log(skus)
    },
    sizeChange(e) {
      this.triggerEvent('sizeChange', e.detail)
    },
    clickBtn (e) {
      // console.log(this.properties.btns, e.target.dataset.btnIndex)
      let that = this
      let index = e.target.dataset.btnindex
      if (this.properties.btns[index].url) {
        wx.navigateTo({
          url: this.properties.btns[index].url,
          success: () => {
            that.onClose()
          }
        })
      } else {
        wx.showToast({
          title: this.properties.toastText,
          icon: 'success',
          duration: 2000
        })
      }
    }
  }
})
