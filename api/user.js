import { http } from '../utils/http'

export function getUserInfo(data) {
  return http._request('/user/info', { data })
    .then(res => res.data)
}

export function login(data) {
  return http._request('/user/login/password', { data })
    .then(res => res.data)
}

export function codeRegisterAndLogin(data) {
  return http._request('/user/login/check/code', { data })
    .then(res => res.data)
}

export function sendSmsCode(data) {
  return http._request('/user/login/send/code', { data })
    .then(res => res.data)
}

export function initUser(data) {
  return http._request('/user/login/init', { data })
   .then(res => res.data)
}

/**
 * 拉取优惠券
 * @param {} data 
 */
export function getUserCoupon(data) {
  return http._request('/user/coupon/list', { data })
    .then(res => res.data)
}

/**
 * 拉取收货地址
 * @param {} data 
 */
export function getUserAddress(data = { limit: 20, offset: 0 }) {
  return http._request('/user/address/list', { data })
    .then(res => res.data)
}
/**
 * 
 * @param {name} data 
 */
export function opearteAddress(data) {
  return http._request('/user/address/edit', { data })
    .then(res => res.data)
}

/**
 * 申请分销商
 * @param {} data 
 */
export function registerDistributor(data) {
  return http._request('/user/toBeDistributor', { data })
    .then(res => res.data)
}


/**
 * 生成新订单
 * @param {} data 
 */
export function newOrder(data) {
  return http._request('/user/order/new', { data })
    .then(res => res.data)
}


/**
 * 拉取订单列表
 * @param {} data 
 */
export function orderList(data) {
  return http._request('/user/order/list', { data })
    .then(res => res.data)
}

/**
 * 拉取我的分销订单
 * @param {} data 
 */
export function distributeOrderList(data) {
  return http._request('/user/order/list', { data })
    .then(res => res.data)
}

/**
 * 拉取我的分销订单
 * @param {} data 
 */
export function orderInfo(data) {
  return http._request('/user/order/info', { data })
    .then(res => res.data)
}

export function uploadImage(data) {
  return http._request('/user/upload/image', data, 'uploadFile')
    .then(res => res.data)
}
/**
 * 添加购物车
 * @param {}} data 
 */
export function addCart(data) {
  return http._request('/user/cart/add', { data })
    .then(res => res.data)
}
/**
 * 删除
 * @param {} data 
 */
export function cartDel(data) {
  return http._request('/user/cart/del', { data })
    .then(res => res.data)
}
/**
 *购物车列表
 *
 * @export
 * @param {*} data
 */
export function cartList(data) {
  return http._request('/user/cart/list', { data })
  .then(res => res.data)
}