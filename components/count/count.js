
// components/count/count.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: { // 商品数量
      type: Number,
      value: 1
    },
    Inventory: {
      type: Number,
      value: 0
    },
    miniCount: {// 最小数量
      type: Number,
      value: 0
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
    changeNum({ detail: { value } }) {
      value = value ? parseInt(value) : this.properties.miniCount
      this.triggerEvent('changeNum', value)
    },
    subtract() {
      this.triggerEvent('subEvent')
    },
    add() {
      let { count, Inventory } = this.properties
      if (count + 1 > Inventory) {
        wx.showToast({
          title: `下单数量不可以超过当前库存${Inventory}`,
          icon: 'none',
          mask: true,
          duration: 2000
        })
        return
      }
      this.triggerEvent('addEvent')
    }
  }
})
