<template>
  <div id="index">
    <div class="section">
      <div class="aside">
        <h3>再度重相逢-Blog</h3>
        <p>白日依山尽,黄河入海流。 欲穷千里目，更上一层楼。</p>
        <router-link to="/home"> Enter Blog</router-link>
      </div>

      <img src="../assets/img/down.png" alt="再度重相逢" class="down" />
      <canvas id="myCanvas"></canvas>
    </div>

    <div class="type mainbox">
      <h3>问题记录</h3>
      <div class="row">
        <dl v-for="(item, index) in list.data" :key="item.id">
          <dt><img src="../assets/img/1.png" alt="" /></dt>
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
          项目记录</router-link>
        <router-link :to="{ path: '/question' }" class="button">问题记录
        </router-link>
      </div>
    </div>

    <div class="indexBottom mainbox">
      <h3>再度重相逢个人博客</h3>
      <p>希望我们每一天都有糖吃</p>
    </div>

    <div class="menu" @click="menuClick" :class="active ? 'active' : ''">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="poper" v-if="active">
      <div class="nav">
        <router-link :to="{ path: '/' }"> 个人首页</router-link>
        <router-link :to="{ path: '/project' }"> 项目记录</router-link>
        <router-link :to="{ path: '/question' }">问题记录 </router-link>
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

const getBlogList = async () => {
  const res = await BlogListApi.getList({
    type: 1,
    page: 1,
    pageSize: 3,
  })
  list = Object.assign(list.data, res.data)
  console.log(list)
}
function menuClick(): void {
  active.value = !active.value;
}

//生命周期
onMounted(() => {
  getBlogList();
});

</script>

<style lang="less" scoped>
#index {
  .section {
    width: 100%;
    height: 100vh;
    background-color: #151515;
    background-image: url("../assets/img/section.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;

    .aside {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);

      h3 {
        color: #fff;
        font-size: 28px;
        margin-bottom: 20px;
      }

      p {
        color: #fff;
        font-size: 16px;
        letter-spacing: 10px;
        margin-bottom: 40px;
      }

      a {
        display: block;
        padding: 0 18px;
        border-radius: 4px;
        background-color: #1e9fff;
        height: 38px;
        line-height: 38px;
        color: #fff;
      }
    }

    .down {
      display: block;
      width: 48px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20px;
      margin: auto;
    }
  }

  .type {
    padding: 100px 0;
    background-color: #fff;

    h3 {
      font-size: 32px;
      padding-bottom: 30px;
      position: relative;
      font-weight: 500;
      text-align: center;

      &:after {
        position: absolute;
        width: 50px;
        height: 2px;
        content: "";
        left: 50%;
        margin-left: -25px;
        bottom: -1px;
        background: #00c2ff;
      }
    }

    .row {
      display: flex;
      justify-content: space-between;

      dl {
        background: #faf9f9;
        width: 32%;
        margin-right: 1%;
        margin-top: 50px;

        &:last-child {
          margin-right: 0;
        }

        dt {
          height: 244px;
          overflow: hidden;
        }

        dd {
          padding: 30px 15px;

          h4 {
            margin-bottom: 10px;
            font-size: 14px;
          }

          .date {
            color: #bbb;
            font-size: 12px;
            margin-bottom: 15px;
          }

          p {
            color: #999;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
      }
    }
  }

  .sectionBottom {
    overflow: hidden;
    width: 100%;
    padding: 200px 0;
    background-image: url("../assets/img/1.png");
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;

    .row {
      display: flex;
      justify-content: center;
      align-items: center;

      .button {
        width: 200px;
        height: 46px;
        margin: 10px;
        border: 1px solid #f7f7f7;
        text-align: center;
        line-height: 46px;
        color: #fff;
        cursor: pointer;
      }
    }
  }

  .indexBottom {
    padding: 100px 0;
    text-align: center;

    h3 {
      font-size: 32px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    p {}
  }

  .menu {
    position: fixed;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    right: 55px;
    top: 40px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
    overflow: hidden;

    z-index: 102;

    &:hover {
      background-color: #000b23;
      transition: all 0.5s;
    }

    &.active {
      span:last-child {
        display: none;
      }

      span:first-child {
        transform: rotate(45deg);
        transition: all 0.5s;
        margin-top: 18px;
      }

      span:nth-child(2) {
        transform: rotate(-45deg);
        transition: all 0.5s;
        margin-top: -2px;
      }
    }

    span {
      display: block;
      background: #fff;
      width: 26px;
      height: 2px;
      line-height: 10px;
      margin: 0 auto;
      margin-top: 5px;
      transition: all 0.5s;

      &:first-child {
        margin-top: 12px;
      }
    }
  }

  .poper {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 0.5s;

    &::before {
      content: "";
      width: 60%;
      height: 100%;
      background: #fff;
      position: fixed;
      top: 0;
      z-index: 11;
      background-image: linear-gradient(46deg, #fff, #f1f2f0);
      right: 0;
      transform: skew(-12deg) translateX(40%);
    }

    .nav {
      position: fixed;
      z-index: 222;
      top: 0;
      bottom: 0;
      right: 0;

      display: flex;
      flex-direction: column;
      justify-content: center;

      a {
        padding: 20px;
        font-size: 20px;
        position: relative;

        &:hover {
          color: #000b23;

          &:before {
            background-color: #000b23;
            right: 0;
          }
        }

        &:before {
          -webkit-transition: all 0.3s linear;
          transition: all 0.3s linear;
          content: "";
          height: 1px;
          background-color: transparent;
          position: absolute;
          top: 50%;
          left: 0;
          right: 105px;


        }
      }
    }
  }
}
</style>