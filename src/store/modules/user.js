import { getUserInfoApi, getUserDetail, login } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    // 登陆获取token
    async getToken(context, payload) {
      const res = await login(payload)
      context.commit('setToken', res)
      setTokenTime()
    },
    // 获取用户信息
    async getUserInfo(context) {
      const userInfo = await getUserInfoApi()
      const userBaseInfo = await getUserDetail(userInfo.userId)
      context.commit('setUserInfo', { ...userInfo, ...userBaseInfo })
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    }
  }
}
