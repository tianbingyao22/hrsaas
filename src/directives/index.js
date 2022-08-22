import store from '@/store'
// 自定义指令配置

export const imgError = {
  inserted: function (el, { value }) {
    // 图片加载错误时触发onerror事件，onerror监听图片加载失败
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  // 指令所绑定的元素更新时触发
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  }
}
export const isHas = {
  inserted(el, binding) {
    const has = store.state.permission.points.includes(binding.value)
    if (!has) {
      el.remove()
    }
  }
}
