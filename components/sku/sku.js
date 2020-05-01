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
    skus: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeValue (e) {
      let title = e.currentTarget.dataset.title
      let sku = e.detail
      sku.key = title
      // let skus = this.data.skus
      // skus[title] = sku
      // this.setData({
      //   skus
      // })
      // console.log(this.data.skus)
      sku.selected = !sku.selected
      this.triggerEvent('changeValue', sku)
    }
  }
})
