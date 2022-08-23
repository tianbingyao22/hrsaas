<template>
  <div class="calendar">
    <div>
      <el-row type="flex" justify="end">
        <el-col :span="5">
          <el-select v-model="currentYear" @change="updateCalendar">
            <el-option
              v-for="item in years"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="currentMonth" @change="updateCalendar">
            <el-option
              v-for="item in 12"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-calendar v-model="curretnDate">
        <template v-slot:dateCell="{ date }">
          <div class="cell-box">
            {{ date.getDate() }}
            <span v-if="isWeek(date)">休</span>
          </div>
        </template>
      </el-calendar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: '',
      currentMonth: '',
      curretnDate: '',
      years: [2018, 2019, 2020, 2021, 2022]
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.curretnDate = date
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, index) => (item = item + index))
    },
    isWeek(date) {
      // 获取当天是周几  getDay()  当天是第几天或者几号 getDate()
      return date.getDay() === 6 || date.getDay() === 0
    },
    updateCalendar() {
      this.curretnDate = this.currentYear + '-' + this.currentMonth
      console.log(this.curretnDate)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table tr td {
    border: none !important;
  }
}
</style>
