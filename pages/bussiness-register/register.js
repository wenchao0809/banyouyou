const app = getApp()

Page({
    data: {
        policyStatus: 'gray'
    },
    takePhoto() {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success (res) {
              // tempFilePath可以作为img标签的src属性显示图片
              const tempFilePaths = res.tempFilePaths
            }
          })
      }
})