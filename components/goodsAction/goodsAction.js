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
    btnType: ""
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
      // this.data.iconList = this.properties.icons
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
        phoneNumber: '1340000' //仅为示例，并非真实的电话号码
      })
    },
    onClickBtn (e) {
      this.setData({
        showCart: !this.data.showCart
      })
      if (e.currentTarget.dataset.btn === 'left') {
        this.setData({
          btnType: 'addCart'
        })
      } else {
        this.setData({
          btnType: 'BuyNow'
        })
      }
    },
    onClose () {
      this.setData({
        showCart: false
      })
    },
    handleContact (e) {
      console.log(e.detail.path)
      console.log(e.detail.query)
    }
  },
  attached () {
    this.setData({
      iconList: this.properties.icons
    })
  }
})
