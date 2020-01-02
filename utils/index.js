import { DEFAULTADDRESS } from './constant'
import { getUserAddress } from '../api/index'
/**
 * 将默认地址保存在缓存
 */
export const saveDefaultAddress = function(addressList) {
    let address
    for (let item of addressList) {
        if (item.IsDefault) {
            address = item
            break
        }
    }
    wx.setStorage({ key: DEFAULTADDRESS, data:  address})
    return address
}
/**
 * 获取默认地址,优先读缓存，其次网络请求获取
 */
export const getDefaultAddress = async function() {
    let address
    try {
        // 取本地缓存
        let value = wx.getStorageSync(DEFAULTADDRESS)
        if (value) {
          address = value
        } else {
          // 网络请求获取
          let addressList = await getUserAddress()
          address = saveDefaultAddress(addressList)
        }
      } catch (e) {
      }
      return address
}