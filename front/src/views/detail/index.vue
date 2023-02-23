<template>
  <main>
    <div class="content">
      <h1>{{ list.title }}</h1>
      <span>{{ list.title }}</span><span>{{ list.author }}</span><span>{{ list.createTime }}</span>
      <div class="line"></div>

      <div class="text" v-html="list.content"></div>
    </div>
  </main>
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
  type: string
}


let list = reactive<BlogListResponse>(
  {
    id: 1,
    author: '',
    content: '',
    createTime: '',
    img: '',
    title: '',
    type: ''
  }
);

// 问题记录
const getBlogList = async () => {
  const res = await BlogListApi.getdetail({
    id: 16,
  })
  list = Object.assign(list, res.data)
}



//生命周期
onMounted(() => {
  getBlogList();

});

</script>


<style lang="less" scoped>
main {
  padding: 60px 0 80px;
  min-height: 800px;

  .content {
    width: 1200px;
    margin: 0 auto;

    h1 {
      font-size: 36px;
      font-weight: bold;
      color: rgba(9, 27, 48, 1);
      line-height: 40px;
      margin-bottom: 21px;
    }

    span {
      font-size: 14px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 28px;
      margin-right: 20px;
    }

    .line {
      border-bottom: 1px solid #EAEAEA;
      margin: 30px 0 40px;
    }
  }
}
</style>