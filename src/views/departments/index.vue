<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <!-- 头部 -->
        <TreeTools
          :TreeNode="company"
          :isRoot="true"
          @add="showAddDept"
        ></TreeTools>
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TreeTools
              @remove="getDepts"
              :TreeNode="data"
              @add="showAddDept"
              @edit="showEditDept"
            ></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>

    <!-- 添加部门的弹出层 -->
    <AddDept
      ref="editDept"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
      @add-success="getDepts"
    ></AddDept>
  </div>
</template>

<script>
import TreeTools from './components/TreeTools.vue'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  data() {
    return {
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      defaultProps: {
        // 数据中那个数据名显示到页面中
        label: 'name'
        // children: 'children',//树形默认查找子节点通过
      },
      company: { name: '传智教育', manager: '负责人' },
      dialogVisible: false,
      currentNode: {},
      loading: false
    }
  },
  components: {
    TreeTools,
    AddDept
  },

  created() {
    this.getDepts()
  },
  methods: {
    async getDepts() {
      this.loading = true
      const res = await getDeptsApi()
      this.treeData = transListToTree(res.depts, '')
      this.loading = false
    },
    showAddDept(TreeNode) {
      this.dialogVisible = true
      this.currentNode = TreeNode
    },
    showEditDept(val) {
      this.dialogVisible = true
      this.$refs.editDept.getDeptById(val.id)
    }
  }
}
</script>

<style scoped lang="less"></style>
