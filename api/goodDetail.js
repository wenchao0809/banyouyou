import { http } from '../utils/http'

export function getGoodInfo(data) {
  return http._request('/building/info', { data })
    .then(res => res.data)
}