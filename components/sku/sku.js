// components/sku/sku.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sku: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    skus: {},
    skusActive: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTag (e) {
      let skutitle = e.currentTarget.dataset.skutitle
      let sku = e.currentTarget.dataset.sku
      let index = e.currentTarget.dataset.index
      let obj = this.data.skus
      let objActive = this.data.skusActive
      obj[skutitle] = sku
      objActive[skutitle] = index
      this.setData({
        skus: obj,
        skusActive: objActive
      })
      // if (obj[skutitle]) {
        
      // } else {
      //   obj[skutitle] = sku
      //   objActive[skutitle] = index
      //   this.setData({
      //     skus: obj
      //   })
      // }
      this.triggerEvent('getSkus', this.data.skus)
    }
  }
})
