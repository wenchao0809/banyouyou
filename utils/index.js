import { CONFIRMORDERADDRESS, CONFRIMORDERGOODLIST } from './constant'
import { getUserAddress } from '../api/index'
/**
 * 将默认地址保存在缓存
 */
export const saveConfirmOrderAddress = function(address) {
    wx.setStorage({ key: CONFIRMORDERADDRESS, data:  address})
    return address
}
/**
 * 获取默认地址,优先读缓存，其次网络请求获取
 */
export const getConfirmOrderAddress = async function() {
    let address = {}
    try {
        // 取本地缓存
        let value = wx.getStorageSync(CONFIRMORDERADDRESS)
        if (value) {
          address = value
        } else {
          // 网络请求获取
          let addressList = await getUserAddress()
          for (let item of addressList) {
              if (item.IsDefault) {
                  address = item
                  break
              }
          }
          if (addressList.length && !address.Id) {
            address = addressList[0]
          }
         saveConfirmOrderAddress(address)
        }
      } catch (e) {
      }
      return address
}

 /**
  * 将对象转为 key: value形式的字符串
  * @param {*} o 
  */
export const objectToString = function(o) {
    let keys  = Object.keys(o)
    let desc = ''
    for (let key of keys) {
      desc += `${key}：${o[key]} `
    }
    return desc.trim()
}
/**
 * 保存确认订单商品列表到缓存
 * @param {数组} goods 
 */
export const setConfirmGoodList = function(goods) {
    goods = goods.map(item => {
      let { Title, Desc, Price, Id, TopPic, PriceId, IsSpecialOffer  } = item
        let count = item.Number || item.count
        let { title, sizeDesc, price, priceId, image } = item
        let data = {
            cartId: Id,
            title: Title || title,
            count: count,
            sizeDesc: Desc || sizeDesc,
            price: Price || price,
            priceId: priceId || PriceId,
            image: image || TopPic,
            isSpecialOffer: IsSpecialOffer
        }
        return data
    })
    try {
        wx.setStorageSync(CONFRIMORDERGOODLIST, goods)
    } catch (error) {
        
    }
}

export const formateDate = function(da) {
    let date = new Date(da)
    if (date === 'Invalid Date') throw new Error('Invalid Date')
    let y = date.getFullYear() + ''
    let m = (date.getMonth() + 1 + '').padStart(2, '0')
    let d = (date.getDate() + '').padStart(2, '0')
    let h = (date.getHours() + '').padStart(2, '0')
    let min = (date.getMinutes() + '').padStart(2, '0')
    let s = (date.getSeconds() + '').padStart(2, 0)
    return `${y}-${m}-${d} ${h}:${min}:${s}`
}