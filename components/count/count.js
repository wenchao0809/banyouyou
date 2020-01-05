// components/count/count.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: { // 商品数量
      type: Number,
      value: 1
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
    changeNum({detail:{value}}){
      let curCount = this.properties.count
      if (!value || value <=0) {
        wx.showToast({title: '你输入的数量不能为空，且不能小于0',icon:"none"});
        value = curCount
      }
      this.triggerEvent('changeNum', parseInt(value)) 
    },
    subtract(){
      if(this.properties.count === 0) {
        wx.showToast({ title: '你输入的数量不能为空，且不能小于0', icon: "none" });
        return
      }
      this.triggerEvent('subEvent')
    },
    add(){
      this.triggerEvent('addEvent') 
    }
  }
})
