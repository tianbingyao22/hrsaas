import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 引入自定义指令文件,全部引入，并重命名为directives
import * as directives from '@/directives'

// 引入封装的全局组件
// import PageTools from '@/components/PageTools'
// Vue.component('PageTools', PageTools)
import component from '@/components'
Vue.use(component)

// 封装过滤器
// 引入dayjs
import * as filters from '@/filters'
for (let key in filters) {
  Vue.filter(key, filters[key])
}
// Vue.filter('formatTime', (val) => {
//   return dayjs(val).format('YYYY-MM-DD')
// })

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 图片的自定义指令
for (const key in directives) {
  Vue.directive(key, directives[key])
}

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
