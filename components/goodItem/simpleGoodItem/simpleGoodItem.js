// components/goodItem/goodItem.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      disableToDetail: {
        type: Boolean,
        value: false
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
  
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
      goProductdetail () {
        if (this.properties.disableToDetail) return
        wx.navigateTo({
          url: '/pages/productdetail/productdetail'
        })
      }
    }
})
  