export const CONFIRMORDERADDRESS = 'confirm-order-address'
export const CONFRIMORDERGOODLIST = 'confirm-order-good-list'
export const MAXCOUNT = 99999
export const USERINFO = 'user-info'
// 订单状态 1 发起订单,待交易确认 2, 已确认,发货 3 已收货 4.已收款 5.订单完成  -1. 取消订单 -2. 退货，未退款
export const ORDERSTATUS =  {
    '1': '待确认',
    '2': '待发货',
    '3': '已收货',
    '4': '已收款',
    '5': '订单完成',
    '-1': '取消订单',
    '-2': '退货/退款'
}