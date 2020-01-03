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
    let address
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
        let { Title, Number, desc, Price, Id, TopPic  } = item
        let { title, count, sizeDesc, price, priceId, image } = item
        let data = {
            title: Title || title,
            count: Number || count,
            sizeDesc: desc || sizeDesc,
            price: Price || price,
            priceId: priceId || Id,
            image: image || TopPic
        }
        return data
    })
    try {
        wx.setStorageSync(CONFRIMORDERGOODLIST, goods)
    } catch (error) {
        
    }
}