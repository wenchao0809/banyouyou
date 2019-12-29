// 价格管理类
export default class PriceMange {
  constructor(priceList) {
    this.priceList = priceList
    this.curPrice = priceList[0]
    this.sizes = this._generateSizes(priceList)
    this.keys = Object.keys(this.sizes)
     // 剩余可选的规格的key
     this.reaminKeys = []
     // 标识所有规格都已选
     this.done = true
    this.setSelectedSize(this.curPrice.Description)
  }
  // 生成sku数据
  _generateSizes(priceList) {
    let first = priceList[0].Description
    let keys = Object.keys(first)
    let sizes = { }
    // init sizes
    for (let key of keys) {
      sizes[key] = []
    }
    // parse sizes
    for(let price of priceList) {
      let desc = price.Description
      for (let key of keys) {
        let cur = sizes[key]
        if(!cur.includes(desc[key])) {
          cur.push(desc[key])
        }
      }
    }
    // formate sizes
    for (let key of keys) {
      sizes[key] = sizes[key].map(item => {
        let size = { id: `${key}-${item}`, disable: false, name: item, selected: false }
        // init default
        if (first[key] === item) size.selected = true
        return  size
      })
    }
    return sizes
  }
  // 重置状态
  resetStatus() {
    let { keys, sizes } = this
    for (let key of keys) {
      let values = sizes[key]
      for (let item of values) {
        item.disable = item.selected = false
      }
    }
    return this
  }
  // set selectedSize
  setSelectedSize(size) {
    this.resetStatus()
    this.selectedSize = size
    this.selectedKeys = Object.keys(this.selectedSize)
    let { keys, selectedKeys } = this
    this.done = keys.length === selectedKeys.length
    this.reaminKeys.length = 0
    if (this.done) {
      this.curPrice = this._computedPrice()[0]
    } else {
      // 还有规格未选
      for (let key of keys) {
        if (!selectedKeys.includes(key)) this.reaminKeys.push(key)
      }
    }
    this.setSelectStatus()
    this.setDisableStatus()
    return this
  }
  _computedPrice(type) {
    // 所有规格已选计算价格
    let prices = [], disablePrices = []
    let { priceList, keys, selectedSize } = this
    for (let price of priceList) {
      let size = price.Description
      for (let key of keys) {
        if(size[key] !== selectedSize[key]) break
        if (key === keys[keys.length - 1]) prices.push(price)
      }
    }
    if (type === 1) {
      for (let price of prices) {
        // 库存为0不可选
        if (price.Inventory === 0) disablePrices.push(price)
      }
      prices = disablePrices
    }
    return prices
  }
  // 设置选中状态
  setSelectStatus() {
    let { sizes, selectedSize, selectedKeys } = this
    for (let key of selectedKeys) {
      let selectName = selectedSize[key]
      let values = sizes[key]
      for (let item of values) {
        if (item.name === selectName) {
          item.selected = true
        }
      }
    }
    return this
  }
  // 设置禁用状态
  setDisableStatus() {
    if (this.done) return this
    let disablePrices = this._computedPrice(1)
    let { sizes, reaminKeys  } = this
    if (disablePrices.length === 0) {
      return this
    } else {
      // 设置禁用的规格
      for (let price of disablePrices) {
        let size = price.Description
        for (let key of reaminKeys) {
          let disableName = size[key]
          let sizeOptions = sizes[key]
          for (let option of sizeOptions) {
            if (option.name === disableName) {
              option.disable = true
              break
            }
          }
        }
      }
    }

    return this
  }
  // connect
  connect(vm) {
    let { curPrice, selectedSize, sizes, } = this
    // curPrice = JSON.parse(JSON.stringify(curPrice))
    // selectedSize = JSON.parse(JSON.stringify(selectedSize))
    // sizes = JSON.parse(JSON.stringify(sizes))
    vm.setData({
      curPrice,
      selectedSize,
      sizes
    })
  }
}
