import request from '@/utils/request'

/**
 * 获取部门列表
 * @returns promise
 */
export function getDeptsApi() {
  return request({
    url: '/company/department'
  })
}

/**
 * 根据部门id删除部门
 * @param {String} id  //部门id
 * @returns promise
 */
export function delDepts(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

/**
 * 新增部门
 * @param {Object} data //新增部门要的表单信息
 * @returns
 */
export function addDeptsApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
