<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button
            type="primary"
            @click="addDialogVisible = true"
            v-if="isHas(point.roles.add)"
            >新增角色</el-button
          >
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button
                  type="success"
                  size="small"
                  @click="showRightsDialog(row.id)"
                  >分配权限</el-button
                >
                <el-button type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small" @click="deleteRole(row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            layout=" sizes,prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :page-sizes="[2, 5, 10, 20]"
            @current-change="currentChange"
            @size-change="sizeChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="companyInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                disabled
                v-model="companyInfo.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="companyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="companyInfo.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 新增角色对话框 -->
    <el-dialog
      title="新增角色"
      @close="addDialogClose"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form
        :model="addRoleForm"
        :rules="addRoleFormRules"
        ref="form"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="AddRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="给角色分配权限"
      :visible.sync="setRightsDialog"
      width="50%"
      @close="setRightsClose"
      destroy-on-close
    >
      <el-tree
        show-checkbox
        default-expand-all
        node-key="id"
        :data="permission"
        :default-checked-keys="defaultCheckedKeys"
        :props="{ label: 'name' }"
        ref="perTree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightsDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSaveRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRolesApi,
  addRoleApi,
  deleteRoleApi,
  getRolesInfo,
  assignPerm
} from '@/api/roles'
import { getCompanyInfoApi } from '@/api/company'
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils'
import mixInsPermissionPoint from '@/minins/permission'
// import permissionPoint from '@/constant/permission'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 2,
      addDialogVisible: false,
      addRoleForm: {
        name: '',
        description: ''
      },
      addRoleFormRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      companyInfo: {},
      setRightsDialog: false,
      permission: [],
      defaultCheckedKeys: [],
      roleId: ''
      // point: permissionPoint
    }
  },
  mixins: [mixInsPermissionPoint],
  created() {
    this.getRoles()
    this.getCompanyInfo()
    this.getPermissions()
  },
  methods: {
    async getRoles() {
      const res = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize
      })
      this.tableData = res.rows
      this.total = res.total
    },
    currentChange(val) {
      this.page = val
      this.getRoles()
    },
    sizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    onClose() {
      this.addDialogVisible = false
    },
    async AddRole() {
      await this.$refs.form.validate()
      await addRoleApi(this.addRoleForm)
      this.$message.success('添加角色成功')
      this.addDialogVisible = false
      this.getRoles()
    },
    async deleteRole(row) {
      await deleteRoleApi(row.id)
      this.getRoles()
    },
    // 监听dialog关闭时的方法
    addDialogClose() {
      this.$refs.form.resetFields()
      this.addRoleForm.region = ''
    },
    // 获取企业信息
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId
      )
      this.companyInfo = res
    },
    // 显示分配权限对话框
    async showRightsDialog(id) {
      this.roleId = id
      this.setRightsDialog = true
      const { permIds } = await getRolesInfo(id)
      this.defaultCheckedKeys = permIds
    },
    // 获取权限列表
    async getPermissions() {
      const res = await getPermissionList()
      const treePermission = transListToTree(res, '0')
      this.permission = treePermission
    },
    // 关闭树形权限列表弹窗
    setRightsClose() {
      this.defaultCheckedKeys = []
      // 由于默认选中只有第一次生效，因此要结合v-if在关闭弹窗时销毁树形才可以生效重置数据，或者运用dialog组件中关闭时销毁组件数据的属性
    },
    // 点击确定保存权限
    async onSaveRights() {
      await assignPerm({
        id: this.roleId,
        permIds: this.$refs.perTree.getCheckedKeys()
      })
      this.$message.success('分配成功')
      this.setRightsDialog = false
    }
    // // 按钮权限
    // isHas(point) {
    //   return this.$store.state.permission.points.includes(point)
    // }
  }
}
</script>

<style scoped lang="scss"></style>
