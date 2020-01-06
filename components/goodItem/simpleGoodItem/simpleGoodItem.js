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
        },
        customeStyle: {
          type: String,
          value: 'background: #f3f3f3'
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
        let id = this.properties.goodInfo.materials_id
        wx.navigateTo({
          url: `/pages/productdetail/productdetail?id=${id}`
        })
      }
    }
})
  