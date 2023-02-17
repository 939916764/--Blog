<script lang="ts" setup>
import { ref, onMounted } from "vue";

// 返回顶部
function returnTop(): void {
  let top: number =
    document.documentElement.scrollTop || document.body.scrollTop;
  // 实现滚动效果
  const timeTop = setInterval(() => {
    document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
    if (top <= 0) {
      clearInterval(timeTop);
    }
  }, 10);
}
const returnVisible = ref(false);

//获取滚动条当前的位置
function getScrollTop(): number {
  var scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}

//获取当前可视范围的高度
function getClientHeight(): number {
  var clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  } else {
    clientHeight = Math.max(
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  }

  return clientHeight;
}
onMounted(() => {
  //滚动事件触发

  window.onscroll = function () {
    if (getScrollTop() >= getClientHeight()) {
      returnVisible.value = true;
    } else {
      returnVisible.value = false;
    }
  };
});
</script>

<template>
  <div class="returnTop" @click="returnTop" v-if="returnVisible">
    <img src="../assets/img/return.png" alt="" />
  </div>
</template>
<style lang="less" scoped>
.returnTop {
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
}
</style>