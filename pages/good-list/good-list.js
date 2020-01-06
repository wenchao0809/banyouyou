import { searchGoods, getGoodInfo } from '../../api/index'
import PriceManage from '../../utils/price-manage'

const sortTypeMap = {
    bysum: 0,
    priceDesc: 1,
    priceAsc: 2,
    count: 3
  }

Page({
    data: {
        orderName: 'bysum',
        goodList: [],
        showCart: false,
        miniCartGoodInfo: {},
        btns: [
            {
              text: '加入购物车'
            },
            {
              text: '立即购买',
              url: '/pages/confirm-order/confirm-order'
            }
        ]
    },

      // order change
  handleOrderChange(e) {
    console.log(e)
    let orderName = e.target.dataset.name || e.currentTarget.dataset.name
    if (orderName === 'byprice') {
      // 默认升序
      orderName = this.data.orderName === 'priceAsc' ? 'priceDesc' : 'priceAsc'
    }
    this.setData({
      orderName: orderName
    })
    this.getNavRightItems()
  },
    // 去详情页
  gotoProductDetail({ currentTarget: { dataset:{ goodid: id }} }){
    wx.navigateTo({
        url: `/pages/productdetail/productdetail?id=${id}`
        // url: `/pages/productlist/productlist?name=${name}`
    })
  },
  getGoodList() {
      let likeName = this.likeName
      return searchGoods({ limit: 10, offset: 0, likeName })
        .then(res => {
            this.setData({ goodList: res })
        })
  },
  showMinCart({currentTarget: { dataset: { goodid: id } }}) {
    getGoodInfo({ id })
      .then(res => {
        let miniCartGoodInfo = {}
        let priceManage = new PriceManage(res.price_list)
        miniCartGoodInfo.priceManage = priceManage
        miniCartGoodInfo.goodInfo = { title: res.title, materials_id: res.Id, image: res.top_pic_list[0] }
        this.setData({ miniCartGoodInfo })
        this.setMiniCartGoodInfo()
      })
    this.setData({
      showCart: true
    })
  },
  sizeChange(e) {
    let priceManage = this.data.miniCartGoodInfo.priceManage
    priceManage.setSelectedSize(e.detail)
    this.setMiniCartGoodInfo()
  },
  setMiniCartGoodInfo() {
    let priceManage = this.data.miniCartGoodInfo.priceManage
    let miniCartGoodInfo = { ...this.data.miniCartGoodInfo }
    miniCartGoodInfo.sizes = priceManage.sizes
    miniCartGoodInfo.curPrice = priceManage.curPrice
    this.setData({ miniCartGoodInfo })
  },
  onClose() {
    this.setData({
      showCart: false
    })
  },
  onLoad: function (options) {
      this.likeName = options.likeName
      this.getGoodList()
  },
})