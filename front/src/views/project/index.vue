<template>
  <div class="content">
    <div class="mainbox">
      <div class="left">
        <div class="rowbox" v-for="item in list.data" :key="item.id">
          <div class="top">
            <div class="title">[原创]{{ item.title }}</div>
            <div class="date">{{ item.createTime }}</div>
          </div>
          <div class="bottom">
            <div class="img"><img :src="item.img" alt="" /></div>
            <div class="introduce">
              {{ item.content }}
            </div>
          </div>
        </div>


      </div>
      <div class="right">
        <div class="aside">
          <div class="search">
            <input type="text" />
            <img src="@/assets/img/search.png" alt="" />
          </div>
          <div class="type"><span>1</span></div>
          <div class="type"><span>2</span></div>
          <div class="type"><span>3</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { BlogListApi } from "@/api/index"
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

const getBlogList = async () => {
  const res = await BlogListApi.getList({
    type: '1',
    page: 1,
    pageSize: 10,
  })
  list = Object.assign(list.data, res.data)
}


//生命周期
onMounted(() => {
  getBlogList();
});

</script>

<style lang="less" scoped>
@import "./index.scss";
</style>