const http = require('../utils/http')

export function getUserInfo(data) {
  return http._request('/user/info', { data })
    .then(res => res.data)
}

export function login(data) {
  return http._request('/user/login/password', { data })
    .then(res => res.data)
}

export function codeLogin(data) {
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
export function getUserAddress(data) {
  return http._request('/user/address/list', { data })
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