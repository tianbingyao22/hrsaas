<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></UploadExcel>
    </div>
  </div>
</template>

<script>
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
import { importEmployees } from '@/api/employees'
import { formatTime } from '@/filters'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    // 上传前的
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请上传xlsx文件')
        return false
      }
      console.log('继续上传')
      return true
    },
    // 解析成功后
    async onSuccess({ results, header }) {
      // console.log(results)
      // console.log(header)
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            // 将excel的时间转换成js时间
            // excel时间戳
            const timestamp = item[key]
            // 转换：excel时间戳实际多了1==>转换成js时间戳
            const data = new Date((timestamp - 1) * 24 * 60 * 60 * 1000)
            // excel的起始时间要比js多70年
            data.setFullYear(data.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(data)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      await importEmployees(newArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped></style>
