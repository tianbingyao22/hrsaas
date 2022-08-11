import request from '@/utils/request'
/**
 * 获取企业信息
 * @param {String} id //根据企业Id获取企业信息
 * @returns
 */
export function getCompanyInfoApi(id) {
  return request({
    url: `/company/${id}`
  })
}
