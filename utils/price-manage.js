// 价格管理类
export default class PriceMange {
  constructor(priceList) {
    this.priceList = priceList
    this.curPrice = priceList[0]
    this.sizes = this._generateSizes(priceList)
    this.keys = Object.keys(this.sizes)
    this.desc = this._computedDescStr()
    this.curPrice.desc = this.desc
    // 当前选择规格
    // this.setSelectedSize({})
    this.selectedKeys = []
    this.keys.forEach(key => {
      this.sizes[key].some(item => {
        if (item.selected) {
          this.selectedKeys.push(key)
          return true
        }
        return false
      })
    })
     // 剩余可选的规格的key
     this.reaminKeys = []
     // 标识所有规格都已选
     this.done = true
     this.selectedSize = {...this.curPrice.Description}
    //  this.sizeChange()
    // this.setSelectedSize(this.curPrice.Description)
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
  sizeChange(size) {
    if (size) {
      let { key, name, selected } = size
      let skus = this.sizes[key]
      if (selected) {
        // 被选中
        this.selectedSize[key] = name
        for (let item of skus) {
          item.selected = item.name === name
        }
      } else {
        // 取消选中
        if (this.selectedSize[key]) {
          delete this.selectedSize[key]
        }
        for (let item of skus) {
          if (item.name === name) {
            item.selected = false
            break
          }
        }
      }
      // this.sizes[key] = [...this.sizes[key]]
    }
    // this.selectedKeys = Object.keys(this.selectedSize)
    this.selectedKeys.push(this.selectedSize.key)

    let { keys, selectedKeys } = this
    // 是否所有规格已选
    this.done = keys.length === selectedKeys.length
    if (this.done) {
      this.curPrice = this._computedPrice()[0]
      this.desc = this._computedDescStr()
      this.curPrice.desc = this.desc
    } else {

    }
  }
  // set selectedSize
  setSelectedSize(size) {
    this.resetStatus()
    this.selectedSize = size
    // this.selectedKeys = Object.keys(this.selectedSize)
    if (!this.selectedKeys.includes(size.key)) {
      this.selectedKeys.push(size.key)
    }
    let { keys, selectedKeys } = this
    this.done = keys.length === selectedKeys.length
    this.reaminKeys.length = 0
    if (this.done) {
      let prices = this._computedPrice()
      prices.forEach(item => {
        Object.keys(item.Description).forEach(key => {
          if (item.Description[key] === size.name) {
            this.curPrice = item
          }
        })
      })
      // this.curPrice = this._computedPrice()[0]
      this.desc = this._computedDescStr()
      this.curPrice.desc = this.desc
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
        if(size[key] === selectedSize[key]) {
          prices.push(price)
          break
        }
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
  _computedDescStr(descObj) {
    descObj = descObj || this.curPrice.Description
    let { keys } = this
    let desc = ''
    for (let key of keys) {
      desc += `${key}：${descObj[key]} `
    }
    return desc.trim()
  }
  // 设置选中状态
  setSelectStatus() {
    let { sizes, selectedSize, selectedKeys } = this
    for (let key of selectedKeys) {
      let selectName = selectedSize[key]
      let values = sizes[key]
      if (values) {
        for (let item of values) {

          if (item.name === selectName) {
            item.selected = true
          }
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
    let { curPrice, selectedSize, sizes, desc } = this
    // curPrice = JSON.parse(JSON.stringify(curPrice))
    // selectedSize = JSON.parse(JSON.stringify(selectedSize))
    // sizes = JSON.parse(JSON.stringify(sizes))
    vm.setData({
      curPrice,
      selectedSize,
      sizes,
      desc
    })
  }
}
