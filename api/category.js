const http = require('../utils/http')

export function getCategoryList() {
  return http._request('/category/list')
  .then(res => res.data)
}

export function getCategoryGoodList(data) {
  return http._request('/category/info/list', { data })
    .then(res => res.data)
}