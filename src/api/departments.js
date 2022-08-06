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

/**
 *根据部门id获取部门详细信息
 * @param {String} id //部门id
 * @returns
 */
export function getDeptByIdApi(id) {
  return request({
    url: '/company/department/' + id
  })
}

/**
 * 根据id修改部门信息
 * @param {Object} data
 * @returns
 */
export function editDeptByIdApi(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
