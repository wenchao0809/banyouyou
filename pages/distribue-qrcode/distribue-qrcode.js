import { getMappQrCode } from '../../api/index'
import { USERINFO } from '../../utils/constant'

const app = getApp()

// pages/set/set.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        qrCode: ''
    },
    saveCodeImage() {
        wx.getImageInfo({
            src: this.data.qrCode,
            success: function (sres) {
              console.log(sres.path);
              wx.saveImageToPhotosAlbum({
                filePath: sres.path,
                success: function (fres) {
                    wx.showToast({
                        title: '保存图片成功',
                        icon: 'success',
                        duration: 2000
                    })
                }
              })
            }
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync(USERINFO)
        this.setData({ userInfo })
        getMappQrCode({ 
            scene: `?distribution_id=${userInfo.Id}`,
            page: 'pages/register/register'
         })
            .then(res => {
              console.log(res)
                this.setData({ qrCode: res })
            })
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    }
  })