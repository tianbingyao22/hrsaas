<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-button size="small" type="primary" @click="showAddDialog('0', 1)"
          >添加权限</el-button
        >
      </el-card>
      <el-table
        :data="permissions"
        border
        style="width: 100%"
        row-key="id"
        ref="table"
      >
        <el-table-column label="名称">
          <template v-slot="{ row }">
            <i
              v-if="row.children"
              class="el-icon-folder-opened"
              style="margin-right: 5px"
              @click="expend(row)"
            ></i>
            <i class="el-icon-folder" v-if="row.type === 2"></i>
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="text" @click="showAddDialog(row.id, 2)"
              >添加</el-button
            >
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 放置一个弹层 用来编辑新增节点 -->
    <el-dialog title="添加权限点" :visible.sync="showDialog">
      <!-- 表单 -->
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width: 90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="onSave"
            >确定</el-button
          >
          <el-button size="small" @click="showDialog = false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission } from '@/api/permission'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      permissions: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false
    }
  },

  created() {
    this.getPermissions()
  },

  methods: {
    async getPermissions() {
      const res = await getPermissionList()
      this.permissions = transListToTree(res, '0')
    },
    // 点击展开图标
    expend(row) {
      row.isExpend = !row.isExpend
      this.$refs.table.toggleRowExpansion(row, row.isExpend)
    },
    // 点击显示添加权限点的弹层
    showAddDialog(id, type) {
      this.showDialog = true
      this.formData.pid = id
      this.formData.type = type
    },
    // 点击确定保存添加的权限点
    onSave() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        await addPermission(this.formData)
        this.showDialog = false
        this.getPermissions()
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-card__body {
  text-align: right;
}
::v-deep .el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
