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
