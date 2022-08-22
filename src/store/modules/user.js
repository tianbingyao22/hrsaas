import { getUserInfoApi, getUserDetail, login } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
import { resetRouter } from '@/router'
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
      return userInfo
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      // 由于退出的时候没有重置路由，因此每次登录新的账号，是添加新的路由，前面账号的路由没有显示但依旧可以访问因此，推出账号时要重置路由
      resetRouter()
      // 推出后，由于路由中存储的规则是每次登录获取筛选后直接覆盖的，因此对结果并不会产生什么影响，为了不占用空间，也可以在退出时，清空vuex中的路由规则
      // 当在commit中加入了对象参数{root:true},context就会升级成全局的context,就可以跨模块访问
      context.commit('permission/setRoutes', [], { root: true })
    }
  }
}
