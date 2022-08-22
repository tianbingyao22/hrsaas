// 全局的一些规则

// 路由前置守卫
import router, { asyncRoutes } from '@/router'
import store from '@/store'

const writeList = ['/login', '404']
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  // 是否登录
  if (token) {
    // 登陆的话获取用户信息
    // 为了避免重复获取用户信息,当用户信息不存在时才获取用户信息
    if (!store.state.user.userInfo.userId) {
      // 异步任务dispatch返回值是promise
      const { roles } = await store.dispatch('user/getUserInfo')
      console.log(roles)
      // 将删选路由规则放置到vuex中,dispatch是个异步任务，要执行完才能进行next，因此要用await修饰
      await store.dispatch('permission/filterRoutes', roles)
      // addRoutes的一个缺陷
      next(to.path)
    }

    // 登录：登陆的是否是login页面
    if (to.path === '/login') {
      // 是登陆页面，去首页
      next('/')
    } else {
      // 不是，直接放行
      next()
    }
  } else {
    // 未登录：是否在白名单
    const isInclude = writeList.includes(to.path)
    if (isInclude) {
      // 在白名单，直接放行
      next()
    } else {
      // 不在白名单，去登录页面
      next('/login')
    }
  }
})
