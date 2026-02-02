

<template>
  <HeadNav @openLogin="openLogin" />
  <RouterView />
  <Footer v-if="$route.path != '/admin'" />

  <Form ref="showForm" />
</template>
<script setup lang="ts">
import HeadNav from "./components/headNav.vue"; //头部导航
import Footer from "./components/footer.vue"; //底部

import { onMounted, ref } from 'vue';
import Form from "@/components/loginForm.vue"

const showForm = ref();
// 打开登录
const openLogin = () => {
  showForm.value.toggle();
}

</script>
<style>
@import "./assets/css/base.css";
</style>
