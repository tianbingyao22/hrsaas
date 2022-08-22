import router, { asyncRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    //   我们自己维护的路由规则，所有的路由规则（静态路由+筛选出来的动态路由）
    routes: [],
    points: [] //按钮权限
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = routes
    },
    setPoints(state, payload) {
      state.points = payload
    }
  },
  actions: {
    filterRoutes(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        return roles.menus.includes(item.meta?.id)
      })
      // 将筛选出来的路由存储到vuex中
      context.commit('setRoutes', routes),
        context.commit('setPoints', roles.points),
        //根据角色的信息筛选出来的该角色的动态路由
        // 如何添加动态路由
        // 404路由必须放在最后面？
        router.addRoutes([
          ...routes,
          { path: '*', redirect: '/404', hidden: true }
        ])
    }
  }
}
