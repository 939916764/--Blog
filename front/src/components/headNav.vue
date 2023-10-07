<template>
  <header>
    <div class="mainbox">
      <div class="logo">
        <router-link to="/">
          Meet<span>Again</span>
        </router-link>
      </div>
      <div class="nav">
        <router-link :to="{ path: item.path }" v-for="(item, index) in router" :key="index">
          <span v-for="(item1, index1) in item.name" :key="index1" :style="{ '--i': index1 }">
            {{ item1 }}</span>
        </router-link>
        <div class="only" @click="openLogin">Logon</div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits(['openLogin'])
const openLogin = () => {
  emit('openLogin')  // 之前子组件修改父组件的数据时需要添加'update:editConfirm'，但是触发父组件的方法不能加'update'
}

const router = ref([
  { path: "/", name: ["H", "o", "m", "e"] },
  { path: "/resume", name: ["R", "e", "s", "u", "m", "e"] },
  { path: "/blog", name: ["B", "l", "o", "g"] },
]);
</script>
<style lang="less" scoped>
header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  backdrop-filter: blur(20px);
  z-index: 999;

  .mainbox {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      font-weight: bold;

      a {
        color: #fff;
        font-size: 24px;

        span {
          color: #38ca9f;
        }
      }

    }

    .nav {
      display: flex;
      height: 100%;
      align-items: center;
      font-weight: bold;

      a {
        height: 100%;
        line-height: 70px;
        margin-right: 40px;
        color: rgba(255, 255, 255, 0.7);

        &:last-child {
          margin-right: 0;
        }

        span {
          position: relative;
          display: inline-block;

        }

        &:hover span {
          animation: animate 0.8s ease-in-out 1;
          animation-delay: calc(0.1s * var(--i));
        }



      }

      .only {
        background: #38ca9f;
        color: #000000;
        height: 44px;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        line-height: 44px;
        padding: 0 20px;
      }
    }
  }
}

@keyframes animate {

  0%,
  40%,
  100% {
    transform: translateY(0);
  }

  20% {
    transform: translateY(-5px);
  }
}
</style>