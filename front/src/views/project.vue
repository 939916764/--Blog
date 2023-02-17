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
            <img src="../assets/img/search.png" alt="" />
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
    type: 1,
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
.content {
  background-color: #2e2e2e;
  min-height: 100vh;

  .mainbox {
    display: flex;
    justify-content: space-between;

    .left {
      padding-bottom: 50px;
      width: calc(100% - 300px - 20px);

      .rowbox {
        background-color: #fff;
        padding: 20px 30px 25px 30px;
        position: relative;

        margin-top: 20px;

        .top {
          border-bottom: 1px solid #909399;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .title {
            font-size: 18px;
            padding: 5px 0;
          }

          .date {
            font-size: 12px;
            color: #e8e9e7;
          }
        }

        .bottom {
          display: flex;
          justify-content: space-between;

          margin-top: 20px;

          .img {
            width: 300px;
            height: 180px;
            overflow: hidden;
            background-color: #f7f7f7;
            margin-right: 20px;
            flex-shrink: 20000;
          }

          .introduce {
            padding-top: 6px;
            line-height: 24px;
            flex-grow: 1;
          }
        }
      }
    }

    .right {
      width: 300px;

      .aside {
        background-color: #fff;
        margin-top: 20px;

        .type {
          height: 40px;
          cursor: pointer;

          span {
            margin: 0 20px;
            padding: 0 20px;
            height: 100%;
            display: block;
            line-height: 40px;
            border-bottom: 1px solid #f7f7f7;
          }

          &:last-child {
            span {
              border-bottom: none;
            }
          }

          &:hover {
            background-color: #f8f9f7;
            border-right: 4px solid #000b23;
          }
        }

        .search {
          padding: 20px;
          background-color: grey;
          position: relative;

          input {
            display: block;
            height: 40px;
            padding: 0 20px;
            background-color: #fff;
            border-radius: 40px;
            position: relative;
            z-index: 5;
            width: 100%;
          }

          img {
            width: 24px;
            position: absolute;
            right: 30px;
            top: 0;
            bottom: 0;
            margin: auto;
            z-index: 222;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>