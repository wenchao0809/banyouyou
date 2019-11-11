// components/popup/popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'customStyle': {
      type: String,
      value: ''
    },
    'overlayStyle': {
      type: String,
      value: ''
    },
    'height': {
      type: String,
      value: '30%'
    },
    'show': {
      type: Boolean,
      value: false
    },
    'overlay': {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // Height: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  // attached () {
  //   let Height = this.properties.height
  //   this.setData({
  //     Height
  //   })
  // }
})
