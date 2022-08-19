<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :http-request="onRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-upload"
      :before-upload="beforeUpload"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="uploadImgDialog">
      <img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// id:AKIDlLgkX4KJYXEengIJ7fwwf7JEsFMCl23n
// key:VjgLjqfEWXHlzwc1A2dwzlGUR7WeOs4z
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDlLgkX4KJYXEengIJ7fwwf7JEsFMCl23n',
  SecretKey: 'VjgLjqfEWXHlzwc1A2dwzlGUR7WeOs4z'
})
// cos.putObject({
//     Bucket: 'examplebucket-1250000000', /* 必须 */
//     Region: 'COS_REGION',     /* 存储桶所在地域，必须字段 */
//     Key: 'exampleobject',              /* 必须 */
//     StorageClass: 'STANDARD',
//     Body: fileObject, // 上传文件对象
//     onProgress: function(progressData) {
//         console.log(JSON.stringify(progressData));
//     }
// }, function(err, data) {
//     console.log(err || data);
// });
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [
        // {
        //   name: 'test',
        //   url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg13.51tietu.net%2Fpic%2F20200118%2F5iim1izngzz5iim1izngzz.jpg&refer=http%3A%2F%2Fimg13.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663119326&t=e8cce7afd5fe3810bfd3819e63a9b16a'
        // }
      ],
      uploadImgDialog: false,
      imgUrl: '',
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hm-hr-1313341617' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          this.loading = false
          if (err || data.statusCode !== 200) {
            console.log(err)
            return this.$message.error('亲，上传失败，请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location
          })
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file, fileList) {
      this.uploadImgDialog = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      const types = ['image/png', 'image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请输入' + types.join('、') + '格式的图片')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过2mb')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
