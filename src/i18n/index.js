import Vue from 'vue'
import VueI18n from 'vue-i18n' // 引入国际化的包
import zh from './messages/zh'
import en from './messages/en'
import Cookie from 'js-cookie'
Vue.use(VueI18n) // 全局注册国际化包
// 准备翻译的语言环境信息
export const messages = {
  en,
  zh
}

const i18n = new VueI18n({
  locale: Cookie.get('lang') || 'zh',
  messages
})

export default i18n
