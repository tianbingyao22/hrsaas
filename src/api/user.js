import request from '@/utils/request'

/**
 * 登录
 * @param {Object} data //表单输入登录信息
 * @returns promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * @returns peomise
 */
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 获取用户详细（基础）信息
 * @param {String} id //用户id
 * @returns
 */
export function getUserDetail(id) {
  return request({
    url: '/sys/user/' + id
  })
}

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
