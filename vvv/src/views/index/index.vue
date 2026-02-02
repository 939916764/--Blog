<template>
  <div id="index">
    <Three class="bg" />
    <div class="section">
      <div class="mainbox">
        <div class="aside">
          <h1>Blog</h1>
          <h1>MeetAgain</h1>
          <h3>You can enjoy a grander sight by climbing to a greater height</h3>
          <p>Record knowledge points, interesting technologies, and issues encountered during the development process</p>
          <router-link to="/project"> Enter Blog</router-link>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="mainbox right">
        <div class="aside">
          <h1>Blog</h1>
          <h1>MeetAgain</h1>
          <h3>You can enjoy a grander sight by climbing to a greater height</h3>
          <p>Record knowledge points, interesting technologies, and issues encountered during the development process</p>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="mainbox ">
        <div class="aside">
          <h1>Blog</h1>
          <h1>MeetAgain</h1>
          <h3>You can enjoy a grander sight by climbing to a greater height</h3>
          <p>Record knowledge points, interesting technologies, and issues encountered during the development process</p>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="mainbox">
        <h3>Question</h3>

      </div>
    </div>

    <div class="section">
      <div class="mainbox columnCenter">
        <h2>再度重相逢-Blog</h2>
        <p>I hope we have sugar every day</p>
      </div>
    </div>


  </div>
</template>

<script lang="ts" setup>
import Three from "@/components/three.vue";
</script>


<style lang="less" scoped>
@import "./index.scss";

.bg {

  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;
  bottom: 0;
  top: 0;
}
</style>