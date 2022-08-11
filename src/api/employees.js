import request from '@/utils/request'

/**
 * 获取员工简单列表
 * @returns promise
 */
export function getEmployeesApi() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工列表
 * @param {Onject} params {page,size}
 */
export function getEmployeesListApi(params) {
  return request({
    url: '/sys/user',
    params
  })
}
