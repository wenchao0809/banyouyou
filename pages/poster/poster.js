// pages/poster/poster.js
import { getMappQrCode } from '../../api/index'
import { USERINFO } from '../../utils/constant'

Page({
  data: {
    painting: {},
    shareImage: '',
    title: '',
    goodImage: '',
    userInfo: {}
  },
  onLoad(options) {
    let { title, goodImage } = options
    let userInfo = wx.getStorageSync(USERINFO)
    this.setData({ title, goodImage, userInfo })
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('getPrice', data => {
      const { price, min_price, max_price } = data
      let money = ''
      if (price) {
        money = `￥${price}`
      } else {
        money = `￥${min_price} ~ ￥${max_price}`
      }
      this.eventDraw(title, goodImage, userInfo, money)
    })
  },
  eventDraw(title, goodImage, userInfo, money) {
    // let { title, goodImage, userInfo } = this.data
    let { Name, HeaderPic } = userInfo
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    getMappQrCode({ scene: `?distribution_id=${userInfo.Id}` })
      .then(res => {
        // debugger
        // wx.showLoading({
        //   title: '12121',
        //   mask: true
        // })
        this.setData({
          painting: {
            width: 375,
            height: 555,
            clear: true,
            views: [
              {
                type: 'image',
                url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg',
                top: 0,
                left: 0,
                width: 375,
                height: 555
              },
              {
                type: 'image',
                url: HeaderPic,
                top: 27.5,
                left: 29,
                width: 55,
                height: 55
              },
              {
                type: 'image',
                url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531401349117.jpeg',
                top: 27.5,
                left: 29,
                width: 55,
                height: 55
              },
              {
                type: 'text',
                content: `您的好友【${Name}】`,
                fontSize: 16,
                color: '#402D16',
                textAlign: 'left',
                top: 33,
                left: 96,
                bolder: true
              },
              // {
              //   type: 'text',
              //   content: '发现一件好货，邀请你一起0元免费拿！',
              //   fontSize: 15,
              //   color: '#563D20',
              //   textAlign: 'left',
              //   top: 59.5,
              //   left: 96
              // },
              {
                type: 'image',
                url: goodImage,
                top: 136,
                left: 42.5,
                width: 290,
                height: 186
              },
              {
                type: 'image',
                url: res,
                top: 443,
                left: 85,
                width: 68,
                height: 68
              },
              {
                type: 'text',
                content: title,
                fontSize: 16,
                lineHeight: 21,
                color: '#383549',
                textAlign: 'left',
                top: 336,
                left: 44,
                width: 287,
                MaxLineNumber: 2,
                breakWord: true,
                bolder: true
              },
              {
                type: 'text',
                content: money,
                fontSize: 19,
                color: '#E62004',
                textAlign: 'left',
                top: 387,
                left: 44.5,
                bolder: true
              },
              // {
              //   type: 'text',
              //   content: '原价:￥138.00',
              //   fontSize: 13,
              //   color: '#7E7E8B',
              //   textAlign: 'left',
              //   top: 391,
              //   left: 110,
              //   textDecoration: 'line-through'
              // },
              {
                type: 'text',
                content: '长按识别图中二维码',
                fontSize: 14,
                color: '#383549',
                textAlign: 'left',
                top: 460,
                left: 165.5,
                lineHeight: 20,
                MaxLineNumber: 2,
                breakWord: true,
                width: 125
              }
            ]
          }
        })
      })
  },
  eventSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  eventGetImage(event) {
    console.log(event)
    const { tempFilePath, errMsg } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        shareImage: tempFilePath
      })
    }
    // wx.hideLoading()
  },
  goHome () {
    wx.switchTab({
      url: '/pages/home/home'
    })
  }
})