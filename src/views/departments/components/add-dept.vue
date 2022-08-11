<template>
  <el-dialog
    :title="dialogTitle"
    :visible="visible"
    width="50%"
    @close="onClose"
  >
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input placeholder="1-50个字符" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input placeholder="1-50个字符" v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          placeholder="请选择负责人"
          style="width: 100%"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="1-300个字符"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDeptsApi,
  addDeptsApi,
  getDeptByIdApi,
  editDeptByIdApi
} from '@/api/departments'
import { getEmployeesApi } from '@/api/employees'
export default {
  data() {
    // 部门名称重复
    const checkDeptName = async (rule, value, callback) => {
      // 重复的话：callback(new Error("部门重复"))
      // 没有重复：callback()
      let isRepeat
      if (this.formData.id) {
        const { depts } = await getDeptsApi()
        const filters = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id
        )
        isRepeat = filters.some((item) => item.name === value)
        isRepeat ? callback(new Error('部门重复')) : callback()
      } else {
        if (!this.currentNode.children) return callback()
        isRepeat = this.currentNode.children.some((item) => item.name === value)
      }
      isRepeat ? callback(new Error('部门重复')) : callback()
    }
    // 部门编码重复
    const checkDeptCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }
      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          // 自定义规则：判断添加的部门名称是否与子部门名称中有重复
          {
            validator: checkDeptName,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: checkDeptCode,
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '请输入部门名称', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      },
      employees: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentNode: {
      type: Object,
      required: true
    }
  },
  created() {
    this.getEmployeesList()
  },
  computed: {
    dialogTitle() {
      return this.formData.id ? '编辑部门' : '添加部门'
    }
  },
  methods: {
    async getEmployeesList() {
      const res = await getEmployeesApi()
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    // 点击确认
    async onSave() {
      // 校验表单
      await this.$refs.form.validate()
      console.log(111)
      try {
        if (this.formData.id) {
          await editDeptByIdApi(this.formData)
          this.$message.success('编辑部门成功')
          this.onClose()
          this.$emit('add-success')
        } else {
          this.formData.pid = this.currentNode.id

          await addDeptsApi(this.formData)
          this.$message.success('新增部门成功')
          this.onClose()
          this.$emit('add-success')
        }
      } catch (error) {
        this.$message.error('操作项目失败')
      }
    },
    async getDeptById(id) {
      const res = await getDeptByIdApi(id)
      this.formData = res
    }
  }
}
</script>

<style scoped></style>
