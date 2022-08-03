// 自定义指令配置


export const imgError = {
  inserted: function (el, { value }) {
    // 图片加载错误时触发onerror事件，onerror监听图片加载失败
    el.onerror = function () {
      el.src = value
    }
  }
}

