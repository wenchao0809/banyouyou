// components/popup/modal/modal.js
Component({
    options: {
    },
    /**
     * 组件的属性列表
     */
    properties: {
      show: {
        type: Boolean,
        value: false
      },
      imageList: {
          type: Array,
          value: []
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
      cancelModal() {
        this.triggerEvent('onCancel', {})
      }
    }
  })
  