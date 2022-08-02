// 全局的一些规则

// 路由前置守卫
import router from '@/router'
import store from '@/store'

const writeList = ['/login', '404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  // 是否登录
  if (token) {
    // 登陆的话获取用户信息
    // 为了避免重复获取用户信息,当用户信息不存在时才获取用户信息
    if (!store.state.user.userInfo.userId) {
      store.dispatch('user/getUserInfo')
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
