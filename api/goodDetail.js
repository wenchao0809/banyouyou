const http = require('../utils/http')

export function getGoodInfo(data) {
  return http._request('/building/info', { data, method: 'POST' })
    .then(res => res.data)
}