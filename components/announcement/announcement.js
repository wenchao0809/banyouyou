
Component({
    /**
     * 组件的属性列表
     */
    options: {
      styleIsolation: 'apply-shared'
    },
    properties: {
      advertising: {
        type: Object,
        value: {}
      },
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      indicatorDots: true,
      circular: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      showPop: false,
      style: 'bottom: 600rpx; width: 80%; left: 10%; border-radius: 20rpx; padding: 0 20rpx; padding-left: 20rpx; box-sizing: border-box;'
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
      cancel() {
        this.triggerEvent('cancel', this.properties.money)
      },
      showPop() {
        this.setData({
          showPop: true
        })
      },
      onClickHide() {
        this.setData({
          showPop: false
        })
      },
      gotoDetail() {
        const { Id } = this.properties.advertising
        let url = `/pages/class/class?id=${Id}`
        wx.reLaunch({ url })
      }
    }
  })
  