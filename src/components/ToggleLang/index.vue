<template>
  <el-dropdown @command="ToggleLang">
    <span class="el-dropdown-link">
      <svg-icon
        style="font-size: 20px; color: #fff; margin-right: 10px"
        iconClass="language"
      ></svg-icon>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :command="key"
        v-for="(value, key) in messages"
        :key="key"
        :disabled="key === $i18n.locale"
        >{{ value.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import Cookie from 'js-cookie'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages
    }
  },

  created() {},

  methods: {
    ToggleLang(val) {
      this.$i18n.locale = val
      this.$router.go(0)
      Cookie.set('lang',val)
    }
  }
}
</script>

<style scoped></style>
