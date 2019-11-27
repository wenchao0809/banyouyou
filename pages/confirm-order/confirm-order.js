Page({
    data: {
        goodList: [{
            title: '5厘米全杨油漆板',
            price: 4499.00,
            total: 10,
            count: 1,
            image: '/image/quick2.jpg'
          }, 
          {
            title: '阻燃中纤板',
            price: 124,
            count: 10,
            size: '15mm',
            image: '/image/quick2.jpg'
          }]
    },
    toSelectAddress() {
      wx.navigateTo({ url: '/pages/selectAddress/selectAddress' })
    }
})