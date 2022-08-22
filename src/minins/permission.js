import permissionPoint from '@/constant/permission'
export default {
  data() {
    return {
      point: permissionPoint
    }
  },
  methods: {
    // 按钮权限
    isHas(point) {
      return this.$store.state.permission.points.includes(point)
    }
  }
}
