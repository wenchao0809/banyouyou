import { http } from '../utils/http'

export function newOrder(data) {
  return http._request('/user/order/new', data)
    .then(res => res.data)
}

export function getOrderList(data) {
  return http._request('/user/order/list', data)
    .then(res => res.data)
}