<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="importEmployee"
            v-isHas="point.employees.import"
            >导入</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="exportExcel"
            v-if="isHas(point.employees.export)"
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="addShow"
            v-if="isHas(point.employees.add)"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                alt=""
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                @click="showErCodeDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="gormatFormOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ccc"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button
                type="text"
                size="small"
                @click="showAssignDialog(row.id)"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="onRemove(row.id)"
                v-if="isHas(point.employees.del)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :total="total"
            :page-size="pages.size"
            layout="prev, pager, next"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
    </div>
    <AddEmployees
      :visible.sync="showAddEmployees"
      @add-success="getEmployeesList"
    ></AddEmployees>
    <!-- 头像二维码对话框 -->
    <el-dialog title="头像二维码" :visible.sync="erCodeDialog">
      <canvas id="canvas"></canvas>
    </el-dialog>

    <!-- 角色分配 -->
    <AssignRole
      :visible.sync="showAssignRole"
      :employeesId="currentEmployeesId"
    ></AssignRole>
  </div>
</template>

<script>
import { getEmployeesListApi, delEmployee } from '@/api/employees'
import employees from '@/constant/employees'
import AddEmployees from './components/add-employees.vue'
import AssignRole from './components/assign-role.vue'
import permissionPoint from '@/constant/permission'
const { exportExcelMapPath, hireType } = employees
import QRcode from 'qrcode'
export default {
  name: 'Employees',
  data() {
    return {
      pages: { page: 1, size: 10 },
      employees: [],
      total: 0,
      showAddEmployees: false,
      erCodeDialog: false,
      showAssignRole: false,
      currentEmployeesId: '',
      point: permissionPoint
    }
  },
  components: {
    AddEmployees,
    AssignRole
  },
  created() {
    this.getEmployeesList()
  },

  methods: {
    async getEmployeesList() {
      const { rows, total } = await getEmployeesListApi(this.pages)
      this.employees = rows
      this.total = total
    },
    currentChange(val) {
      this.pages.page = val
      this.getEmployeesList()
    },
    gormatFormOfEmployment(row, column, cellValue, index) {
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
      // if (cellValue === 1) return '正式'
      // if (cellValue === 2) return '非正式'
      // return '未知'
    },
    async onRemove(id) {
      await this.$confirm('确定要删除？')
      await delEmployee(id) //删除
      this.$message.success('删除员工成功')
    },
    addShow() {
      this.showAddEmployees = true
    },
    importEmployee() {
      this.$router.push('/import')
    },
    async exportExcel() {
      const { rows } = await getEmployeesListApi({ page: 1, size: this.total })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const hireItem = hireType.find(
              (hire) => hire.id === item[exportExcelMapPath[h]]
            )
            return hireItem ? hireItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      const { export_json_to_excel } = await import('@/vendor/export2excel')
      export_json_to_excel({
        header,
        data, //具体数据 必填
        filename: '员工列表', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx' //非必填
      })
    },
    // 显示头像二维码
    showErCodeDialog(val) {
      if (!val) return this.$message.error('该用户还没有设置头像')
      this.erCodeDialog = true
      // 视图更新异步任务，canvas还没挂在上去，获取不到
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRcode.toCanvas(canvas, val)
      })
    },
    // 显示角色分配
    showAssignDialog(id) {
      this.currentEmployeesId = id
      this.showAssignRole = true
    },
    // 判断是否存在该按钮权限
    isHas(point) {
      return this.$store.state.permission.points.includes(point)
    }
  }
}
</script>

<style scoped lang="less"></style>
