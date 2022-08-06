<template>
  <el-row type="flex" style="width: 100%">
    <el-col>{{ TreeNode.name }}</el-col>
    <el-col :span="5">
      <el-row type="flex">
        <el-col>{{ TreeNode.manager }}</el-col>
        <el-col>
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$emit('add', TreeNode)"
                >添加部门</el-dropdown-item
              >
              <template v-if="!isRoot">
                <el-dropdown-item @click.native="$emit('edit', TreeNode)"
                  >编辑部门</el-dropdown-item
                >
                <!-- 组件不支持原生事件，要用原生事件可以用.native 修饰符-->
                <el-dropdown-item @click.native="onRemove"
                  >删除部门</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepts } from '@/api/departments'
export default {
  data() {
    return {}
  },
  props: {
    TreeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  created() {},

  methods: {
    async onRemove() {
      try {
        await this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delDepts(this.TreeNode.id)
        this.$message.success('删除成功')
        this.$emit('remove')
        // console.log(this.TreeNode.id)
      } catch (error) {}
    }
  }
}
</script>

<style scoped></style>
