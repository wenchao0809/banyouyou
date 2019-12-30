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
    },
    goodInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 1
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
    // 获取数量
    getSelectNum({ detail: count }) {
      this.setData({ count })
    },
    clickBtn (e) {
      let name = e.target.dataset.name
      if (name === '加入购物车') {
        this.triggerEvent('addCart', this.data.count)
      } else if (name === '立即购买') {
        this.triggerEvent('toBuy', this.data.count)
      }
    }
  }
})
