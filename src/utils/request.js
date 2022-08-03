// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'

function isTimeOut() {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > timeout
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use(async (config) => {
  // 如果存在token,则请求头携带token
  // if (store.state.user.token) {
  //   config.headers.Authorization= 'Bearer ' + store.state.user.token
  // }
  // return config
  if (!store.state.user.token) return config

  if (isTimeOut()) {
    // 判断token是否过期，过期，跳到登录页
    await store.dispatch('user/logout')
    router.push('/login')
    return Promise.reject(new Error('登录过期'))
  } else {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
}) // 请求拦截器
service.interceptors.response.use(
  (res) => {
    // 请求成功函数
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async function (error) {
    if (error.response?.status === 401) {
      await store.dispatch('user/logout')
      router.push('/login')
      Message.error('登录过期')
    } else {
      Message.error(error.message)
    }

    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例
