<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane name="account" label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formData.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="user" label="个人详情">
            <userInfo></userInfo>
          </el-tab-pane>
          <el-tab-pane name="job" label="岗位信息">
            <jobInfo></jobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetail, saveUserDetailById } from '@/api/user'
import userInfo from './components/user-info.vue'
import Cookies from 'js-cookie'
import jobInfo from './components/job-info.vue'

export default {
  data() {
    return {
      formData: {},
      activeName: Cookies.get('activeName') || 'account'
    }
  },

  created() {
    this.loadUserDetail()
  },
  components: {
    userInfo,
    jobInfo
  },
  methods: {
    async loadUserDetail() {
      const res = await getUserDetail(this.$route.params.id)
      this.formData = res
    },
    async onSave() {
      await saveUserDetailById(this.formData)
      this.$message.success('更新成功')
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style scoped></style>
