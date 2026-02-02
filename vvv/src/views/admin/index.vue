<template>
  <div id="index">

    <div class="option">
      <div class="searchBox">
        <el-input v-model="form.title" placeholder="标题" :suffix-icon="Search" />
        <el-select v-model="form.type" placeholder="Select">
          <el-option label="全部" value="" />
          <el-option label="项目记录" value="1" />
          <el-option label="问题记录" value="2" />
        </el-select>
        <el-button type="primary" @click="getBlogList()" style="margin-left: 20px;">搜索</el-button>
      </div>
      <el-button type="primary" @click="add()">添加</el-button>
    </div>

    <el-table :data="list.data" style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="title" label="标题" width="400">
        <template #default="scope">
          <div class="titleText" :title="scope.row.title">{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="img" label="封面" width="200">
        <template #default="scope">
          <div><img :src="scope.row.img" alt="再度重相逢-Blog" style="height:100px"></div>
        </template>
      </el-table-column> -->
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="type" label="类型">
        <template #default="scope">
          <div>{{ scope.row.type === '1' ? '项目记录' : '问题记录' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template #default="scope">
          <div>{{ scope.row.createTime.split('T')[0] }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button link type="danger" size="small" @click="deleted(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>



    <el-dialog v-model="dialogFormVisible" :title="title">
      <el-form :model="form" ref="ruleFormRef" :rules="rules" label-width="100px">
        <el-form-item prop="title" label="标题">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item prop="img" label="封面">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload" :http-request="unploadImg">
            <img v-if="form.img" :src="form.img" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio label="1"> 项目记录</el-radio>
            <el-radio label="2">问题记录</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <TEditor ref="editor" v-model="form.content" @getContent="getContent" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author" disabled />
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="confirm(ruleFormRef)"> 确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from "vue";
import { BlogListApi, FormApi, UploadApi } from "@/api/index"
import { ElDialog, ElForm, ElInput, ElFormItem, ElMessage, ElTable, ElTableColumn, ElButton, ElRadioGroup, ElRadio, UploadProps, ElUpload, ElIcon, ElSelect, ElOption } from 'element-plus'

import type { FormInstance, FormRules } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import TEditor from '@/components/TEditor.vue';


interface BlogListResponse {
  author: string,
  content: string,
  createTime: string,
  id: number,
  img: string,
  title: string,
}
interface Userdata {
  data: [BlogListResponse];
}
const imageUrl = ref('')
const ruleFormRef = ref<FormInstance>()
const dialogFormVisible = ref(false)
const title = ref('添加')
let form = reactive({
  author: '再度重相逢',
  content: '',
  img: '',
  title: '',
  type: '',
  id: '',
})
const rules = reactive<FormRules>({
  content: [{ required: true, message: '内容不能为空', trigger: 'blur' },],
  img: [{ required: true, message: '图片不能为空', trigger: 'blur' },],
  title: [{ required: true, message: '标题不能为空', trigger: 'blur' },],
})
const search = ref('')
let list = reactive<Userdata>({
  data: [{
    id: 0,
    author: '',
    content: '',
    createTime: '',
    img: '',
    title: '',
  }],
});
const add = () => {
  const newform = {
    author: '再度重相逢',
    content: '',
    img: '',
    title: '',
    type: '',
    id: '',
  }
  form = Object.assign(form, newform)
  title.value = '添加'
  dialogFormVisible.value = !dialogFormVisible.value
}
const edit = (row: any) => {
  form.id = row.id
  form = Object.assign(form, row)
  console.log(form)
  title.value = '编辑'
  dialogFormVisible.value = !dialogFormVisible.value
}
const deleted = (id: string) => {
  FormApi.formDel({ id }).then(res => {
    ElMessage.success(res.message)
    getBlogList()
  })
}
const cancel = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  dialogFormVisible.value = !dialogFormVisible.value
}
const confirm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      if (title.value === '编辑') {
        FormApi.formUpdate(form).then(res => {
          ElMessage.success(res.message)
          dialogFormVisible.value = !dialogFormVisible.value
          const newform = {
            author: '再度重相逢',
            content: '',
            img: '',
            title: '',
            type: '',
            id: '',
          }
          form = Object.assign(form, newform)
          getBlogList()
        })
      } else {
        FormApi.formInsert(form).then(res => {
          ElMessage.success(res.message)
          dialogFormVisible.value = !dialogFormVisible.value
          const newform = {
            author: '再度重相逢',
            content: '',
            img: '',
            title: '',
            type: '',
            id: '',
          }
          form = Object.assign(form, newform)
          getBlogList()
        })
      }
    } else {
      console.log('error submit!')
    }
  })
}

const unploadImg: any = (rawFile: { file: string | Blob; }) => {
  const formData = new FormData();
  formData.append("file", rawFile.file);
  UploadApi.upload(formData).then(res => {
    ElMessage.success(res.message)
    form.img = res.img
  })
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!(rawFile.type === 'image/jpeg' || rawFile.type === 'image/png')) {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
const getBlogList = async () => {
  const res = await BlogListApi.getList({
    page: 1,
    pageSize: 10,
    type: form.type,
    title: form.title
  })
  let data = JSON.parse(JSON.stringify(res.data))
  list.data = data
}

const getContent = (v: string) => {
  form.content = v
}
//生命周期
onMounted(() => {
  getBlogList()
});




</script>


<style lang="less" scoped>
@import "./index.scss";
</style>