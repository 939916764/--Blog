<template>
  <div class="content">
    <div class="mainbox">
      <div class="left">
        <div class="rowbox" v-for="item in list.data" :key="item.id" @click="openDetail(item.id)">
          <div class="top">
            <div class="title">[原创] {{ item.title }}</div>
            <div class="date">{{ item.createTime }}</div>
          </div>
          <div class="bottom">
            <div class="img"><img v-imgLazy="item.img" alt="再度重相逢-Blog" /></div>
            <p class="introduce" v-html="item.content">
            </p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="aside">
          <div class="search">
            <input type="text" v-model="form.title" />
            <img src="@/assets/img/search.png" alt="" @click="getBlogList" />
          </div>
          <div class="type" v-for="item in list.data" :key="item.id" @click="openDetail(item.id)"><span> {{ item.title
          }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, onMounted, reactive } from "vue";
import { BlogListApi } from "../../api/index"
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

interface Userdata {
  data: [{
    author: string,
    content: string,
    createTime: string,
    id: number,
    img: string,
    title: string,
  }];
}

const router = useRouter();
let list = reactive<Userdata>({
  data: [{
    id: 1,
    author: '1',
    content: '1',
    createTime: '1',
    img: '1',
    title: '1',
  }]
});
let form = reactive({
  title: '',
})


const getBlogList = async () => {
  const res = await BlogListApi.getList({
    type: '2',
    page: 1,
    pageSize: 10,
    title: form.title
  })
  let data = JSON.parse(JSON.stringify(res.data))
  list.data = data
  if (res.data.length == 0) {
    ElMessage.success('没有找到，请重新输入')
  }

}
const openDetail = (id: number) => {
  router.push(`/detail/${id}`)
}



//生命周期
onMounted(() => {
  getBlogList();
});

</script>

<style lang="less" scoped>
@import "./index.scss";
</style>