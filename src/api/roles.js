import request from '@/utils/request'

/**
 * 获取所有角色列表
 * @param {Object} params //page,pagesize
 * @returns
 */
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 添加角色
 * @param {Onject} data //{name,region}
 */
export function addRoleApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 根据角色id删除角色
 * @param {String} id //角色Id
 * @returns
 */
export function deleteRoleApi(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

/**
 * 根据角色id获取角色详情信息
 * @param {String} id //角色id
 * @returns
 */
export function getRolesInfo(id) {
  return request({
    url: '/sys/role/' + id
  })
}


/**
 *给角色分配权限
 * @param {Object} data {id,permIds}
 * @returns promise
 */
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
