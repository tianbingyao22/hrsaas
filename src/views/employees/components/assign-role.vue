<template>
  <el-dialog title="角色分配" :visible="visible" @close="close" @open="onOpen">
    <el-checkbox-group v-model="checkList">
      <el-checkbox :label="item.id" v-for="item in roles" :key="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesApi } from '@/api/roles'
import { getUserDetail } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    employeesId: {
      type: String,
      required: true
    }
  },
  created() {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    async getRolesList() {
      const res = await getRolesApi()
      this.roles = res.rows
    },
    onOpen() {
      this.getRolesList()
      this.getEmployeesDetail()
    },
    // 根据id获取用户详细信息包括角色
    async getEmployeesDetail() {
      const { roleIds } = await getUserDetail(this.employeesId)
      this.checkList = roleIds
    },
    // 分配角色
    async assignRole() {
      if (!this.checkList.length) return this.$message.error('请分配角色')
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList
      })
      this.$message.success('分配成功')
      this.close()
    }
  }
}
</script>

<style scoped></style>
