<template>
  <div ref="main" class="satarEcharts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Satar',
  data() {
    return {}
  },

  created() {},
  mounted() {
    // 方法中要用到dom要素，因此要在mounted中调用
    this.initSatar()
  },

  methods: {
    initSatar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main)
      //   配置对象
      const satarOption = {
        title: {
          text: '人员绩效表',
          textStyle: {
            color: '#497afb'
          }
        },
        legend: {
          data: ['张三', '李四']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '加班', max: 100 },
            { name: '带薪拉屎', max: 100 },
            { name: '摸鱼', max: 100 },
            { name: '打代码', max: 100 },
            { name: '睡觉', max: 100 },
            { name: 'bug', max: 100 }
          ],
          splitArea: {
            show: true,
            areaStyle: {
              color: ['#fff', '#c0c4cc']
            }
          },
          axisName: {
            color: '#000'
          },
          axisLine: {
            lineStyle: {
              color: 'red'
            }
          }
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [100, 100, 100, 100, 100, 100],
                name: '张三'
              },
              {
                value: [50, 40, 80, 60, 40, 20],
                name: '李四'
              }
            ]
          }
        ]
      }
      // 绘制图表
      myChart.setOption(satarOption)
    }
  }
}
</script>

<style scoped lang="scss">
.satarEcharts {
  width: 500px;
  height: 500px;
}
</style>
