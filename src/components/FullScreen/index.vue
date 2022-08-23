<template>
  <div style="margin-right: 10px">
    <svg-icon
      iconClass="fullscreen"
      className="fullscreen"
      @click="screenFull"
    ></svg-icon>
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    screenFull() {
      if (ScreenFull.isEnabled) {
        ScreenFull.toggle()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
}
</style>
