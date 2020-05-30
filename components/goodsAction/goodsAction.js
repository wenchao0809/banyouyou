// components/goodsAction/goodsAction.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  
  properties: {
    icons: {
      type: Array,
      value: []
    },
    btns: {
      type: Array,
      value: []
    },
    cartInfo: {
      type: Object,
      value: {}
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    showFlag: false,
    showCart: false,
    changeStar: false,
    iconList: [],
    btn: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickIcon (e) {
      let that = this
      let index = this.data.iconList.findIndex(item => {
        return e.currentTarget.dataset.icon === item.icon
      })
      let item = `iconList[${index}].click`
      // console.log(this.data.iconList[index].url)
      if (this.data.iconList[index].url) {
        wx.switchTab({
          url: this.data.iconList[index].url
        })
      }

      this.setData({
        [item]: !this.data.iconList[index].click
      })
      if (e.currentTarget.dataset.icon === 'icon-10') {
        this.setData({
          showFlag: !that.data.showFlag
        })
      } else if (e.currentTarget.dataset.icon === 'icon-shoucang' || e.currentTarget.dataset.icon === 'icon-buoumaotubiao44') {
        let icon = `iconList[${index}].icon`
        if (!this.data.changeStar) {
          this.setData({
            [icon]: 'icon-buoumaotubiao44',
            changeStar: !this.data.changeStar
          })
        } else {
          this.setData({
            [icon]: 'icon-shoucang',
            changeStar: !this.data.changeStar
          })
        }
      }

    },
    phoneCall (e) {
      wx.makePhoneCall({
        phoneNumber: '13590385880' //仅为示例，并非真实的电话号码
      })
    },
    onClickBtn (e) {
      this.setData({
        showCart: !this.data.showCart
      })
      let index = e.currentTarget.dataset.index
      let btn = [this.properties.btns[index]]
      this.setData({
        btn 
      })
      // if (e.currentTarget.dataset.btn === 'left') {
      //   this.setData({
      //     btnType: 'addCart'
      //   })
      // } else {
      //   this.setData({
      //     btnType: 'BuyNow'
      //   })
      // }
    },
    onClose () {
      this.setData({
        showCart: false
      })
    },
    handleContact (e) {
      console.log(e.detail.path)
      console.log(e.detail.query)
    },
    // 选择商品属性发声改变
    sizeChange(e) {
      this.triggerEvent('sizeChange', e.detail)
    },
    addCart(e) {
      this.triggerEvent('addCart', e.detail)
    },
    toBuy(e) {
      this.triggerEvent('toBuy', e.detail)
    }
  },
  attached () {
    this.setData({
      iconList: this.properties.icons
    })
  }
})
