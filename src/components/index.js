import PageTools from '@/components/PageTools'
// 注册全局组件只需要引入，并在数组中写入组件即可
const components = [PageTools]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
