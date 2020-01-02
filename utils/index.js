import { CONFIRMORDERADDRESS } from './constant'
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