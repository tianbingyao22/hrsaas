// 全局的一些规则

// 路由前置守卫
import router from '@/router'
import store from '@/store'

const writeList = ['/login', '404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  // 是否登录
  if (token) {
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
