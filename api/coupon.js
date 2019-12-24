import { http } from '../utils/http'

export function getCouponList(data) {
  return http._request('/user/coupon/list', { data, method: 'POST' })
    .then(res => res.data)
}