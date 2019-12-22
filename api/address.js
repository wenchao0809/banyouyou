const http = require('../utils/http')

export function getAddressList({ limit = 20, offset = 0 }) {
  return http._request('/user/address/list', {
    limit,
    offset
  })
    .then(res => res.data)
}