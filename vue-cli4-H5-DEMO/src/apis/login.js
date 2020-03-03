import request from '@/utils/request'
/**
 * 根据类型获取订单列表
 */
export function getOrderList(params) {
  return new Promise((resolve, reject) => {
    request({
      url: `/api/v1/user/orders`,
      method: 'get',
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
