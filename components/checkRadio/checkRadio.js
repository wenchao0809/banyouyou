// components/count/count.js
Component({
    /**
     * 组件的属性列表
     */
    externalClasses: ['check-raio'],
    properties: {
      color: { // 选中颜色
        type: String,
        value: '#e4393c'
      },
      size: {
        type: Number,
        value: 23
      },
      checked: {
        type: Boolean,
        value: false
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
        handleClick() {
            this.triggerEvent('change', !this.properties.checked)
        }
    }
  })
  