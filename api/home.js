const http = require('../utils/http')

export function getBanners() {
  return http._request('/banner/list', { method: 'POST' })
    .then(res => res.data)
}