<template>
  <main>
    <div class="content">
      <h1>{{ list.title }}</h1>
      <span>{{ list.type === '1' ? '项目记录' : '问题记录' }}</span><span>{{ list.author }}</span><span>{{
        list.createTime.split('T')[0]
      }}</span>
      <div class="line"></div>

      <div class="text" v-html="list.content"></div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { BlogListApi } from "@/api/index"
import { useRouter } from 'vue-router'
interface BlogListResponse {
  author: string,
  content: string,
  createTime: string,
  id: number,
  img: string,
  title: string,
  type: string
}

const router = useRouter();
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
    id: router.currentRoute.value.params.id,
  })
  list = Object.assign(list, res.data)
}



//生命周期
onMounted(() => {
  getBlogList();
  console.log()

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