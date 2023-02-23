<template>
  <div id="index">
    <div class="section">
      <div class="aside">
        <h3>再度重相逢-Blog</h3>
        <p>You can enjoy a grander sight by climbing to a greater height.</p>
        <router-link to="/project"> Enter Blog</router-link>
      </div>

      <img src="@/assets/img/down.png" alt="再度重相逢" class="down" />
      <canvas id="myCanvas"></canvas>
    </div>

    <div class="type mainbox">
      <h3>Question</h3>
      <div class="row">
        <dl v-for="(item, index) in list.data" :key="item.id">
          <dt><img v-imgLazy="`https://edu.yjk.cn/storage/course/img/20220718/72b3ebad302745e29cbd400e87367295.png`"
              alt="" /></dt>
          <dd>
            <h4>{{ item.title }}</h4>
            <div class="date">{{ item.createTime }}</div>
            <p>{{ item.content }}</p>
          </dd>
        </dl>
      </div>
    </div>

    <div class="sectionBottom">
      <div class="row">
        <router-link :to="{ path: '/project' }" class="button">
          project</router-link>
        <router-link :to="{ path: '/question' }" class="button">question
        </router-link>
      </div>
    </div>

    <div class="indexBottom mainbox">
      <h3>再度重相逢-Blog</h3>
      <p>I hope we have sugar every day</p>
    </div>

    <div class="menu" @click="menuClick" :class="active ? 'active' : ''">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="poper" v-if="active">
      <div class="nav">
        <router-link :to="{ path: '/' }"> index</router-link>
        <router-link :to="{ path: '/project' }"> project</router-link>
        <router-link :to="{ path: '/question' }">question </router-link>
        <router-link :to="{ path: '' }" @click.stop="openLogin()">login </router-link>
      </div>
    </div>

    <Form ref="showForm" />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { BlogListApi } from "@/api/index"
import Form from "@/components/loginForm.vue"
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


const showForm = ref();
const active = ref(false);
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

// 问题记录
const getBlogList = async () => {
  const res = await BlogListApi.getList({
    type: '1',
    page: 1,
    pageSize: 3,
  })
  list = Object.assign(list.data, res.data)
}

// 菜单是否打开
const menuClick = (): void => {
  active.value = !active.value;
}

// 打开登录
const openLogin = () => {
  showForm.value.toggle();
}





//生命周期
onMounted(() => {
  getBlogList();

});

</script>


<style lang="less" scoped>
@import "./index.scss";
</style>